# # Stage 1: Use the Selenium image with Chrome
# FROM selenium/standalone-chrome:latest AS chrome

# # Stage 2: Use Apache Superset as the base
# FROM apache/superset:latest

# FROM node:18 AS build-stage
# # Switch to root user to install additional packages
# USER root

# # Copy the ChromeDriver and Google Chrome from the Selenium image
# COPY --from=chrome /usr/bin/chromedriver /usr/local/bin/chromedriver
# COPY --from=chrome /opt/google/chrome /opt/google/chrome

# # Install additional dependencies needed for Superset and Chrome
# RUN apt-get update -y && \
#     apt-get install -y \
#     wget \
#     unzip \
#     gnupg \
#     libgconf-2-4 \
#     python3-venv \
#     python3-pip \
#     libnss3 \
#     libgdk-pixbuf2.0-0 \
#     libgtk-3-0 \
#     libxss1 \
#     libasound2 \
#     libxtst6 \
#     libpci3 \
#     libpangocairo-1.0-0 \
#     libatk-bridge2.0-0 \
#     libatk1.0-0 \
#     libcups2 \
#     libxcomposite1 \
#     libxdamage1 \
#     libxrandr2 \
#     libatspi2.0-0 \
#     libx11-xcb1 \
#     libdrm2 \
#     libgbm1 \  
#     build-essential \ 
#     pkg-config \
#     libmariadb-dev \ 
#     sqlite3 \
#     && rm -rf /var/lib/apt/lists/* \
#     && pip install fastapi uvicorn sqlalchemy

# # Set environment variables for Superset
# ENV CHROME_BIN=/opt/google/chrome/google-chrome \
#     CHROMEDRIVER_PATH=/usr/local/bin/chromedriver

# # # Set environment variables for Superset
# # ENV SUPERSET_HOME=/app/superset_home
# # ENV SUPERSET_CONFIG_PATH=/app/superset_config.py

# # Set the working directory
# WORKDIR /app

# # Copy custom configuration files
# COPY superset_config.py /app/superset_config.py
# COPY superset-frontend /app/superset-frontend

# COPY superset /app/superset
# COPY setup_superset.sh /app/setup_superset.sh
# COPY superset_home /app/superset_home
# COPY requirements /app/requirements
# COPY API_NEW.py /app/API_NEW.py
# COPY aapp.sh /app/aapp.sh

# # Ensure the setup script has execution permissions
# RUN chmod +x  /app/setup_superset.sh
# RUN chmod +x /app/aapp.sh

# # Create and activate a virtual environment
# RUN python3 -m venv /app/venv

# # Upgrade pip and install Python dependencies
# RUN . /app/venv/bin/activate && \
#     pip install --upgrade pip setuptools wheel && \
#     pip install -r /app/requirements/base.txt

# # Install Node.js and npm
# RUN apt-get update && apt-get install -y nodejs npm redis-server

# # Install frontend dependencies
# WORKDIR /app/superset-frontend
# RUN npm install --force

# # Install prettier globally
# RUN npm install --global prettier

# # Run prettier
# RUN npx prettier --write . || echo "Prettier failed"

# # Run build
# RUN rm -rf /app/superset/static/assets/* && npm run build || echo "Build failed"

# RUN npm run dev
# # Switch back to the default Superset user
# USER superset

# # Entry point to setup Superset
# ENTRYPOINT ["/app/setup_superset.sh"]

# # Expose the port for Superset
# EXPOSE 8088
# EXPOSE 6379



# Stage 1: Build frontend with Node.js
FROM node:18 AS build-stage

# Stage 2: Use Selenium with Chrome
FROM selenium/standalone-chrome:latest AS chrome

# Stage 3: Apache Superset base image
FROM apache/superset:latest

# Switch to root user to install additional packages
USER root

# Copy the ChromeDriver and Google Chrome from the Selenium image
COPY --from=chrome /usr/bin/chromedriver /usr/local/bin/chromedriver
COPY --from=chrome /opt/google/chrome /opt/google/chrome

# Install necessary system dependencies
RUN apt-get update -y && \
    apt-get install -y \
    wget \
    unzip \
    gnupg \
    libgconf-2-4 \
    python3-venv \
    python3-pip \
    libnss3 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libxss1 \
    libasound2 \
    libxtst6 \
    libpci3 \
    libpangocairo-1.0-0 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libatspi2.0-0 \
    libx11-xcb1 \
    libdrm2 \
    libgbm1 \
    build-essential \
    pkg-config \
    libmariadb-dev \
    sqlite3 \
    nodejs \
    npm \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies for Superset
RUN pip install fastapi uvicorn sqlalchemy

# Set environment variables for Superset and Chrome
ENV CHROME_BIN=/opt/google/chrome/google-chrome \
    CHROMEDRIVER_PATH=/usr/local/bin/chromedriver

# Set the working directory
WORKDIR /app

# Copy the necessary Python and configuration files
COPY --chown=superset:superset pyproject.toml setup.py MANIFEST.in README.md ./
COPY --chown=superset:superset superset-frontend/package.json superset-frontend/package-lock.json /app/superset-frontend/

# Copy custom configuration files and scripts
COPY superset_config.py /app/superset_config.py
COPY superset-frontend /app/superset-frontend
COPY superset /app/superset
COPY setup_superset.sh /app/setup_superset.sh
COPY superset_home /app/superset_home
COPY requirements /app/requirements
COPY API_NEW.py /app/API_NEW.py
COPY aapp.sh /app/aapp.sh

# Ensure the setup script has execution permissions
RUN chmod +x /app/setup_superset.sh /app/aapp.sh

# Create and activate a virtual environment
RUN python3 -m venv /app/venv

# Upgrade pip and install Python dependencies
RUN /app/venv/bin/pip install --upgrade pip setuptools wheel && \
    /app/venv/bin/pip install -r /app/requirements/base.txt

# Install frontend dependencies in superset-frontend directory
WORKDIR /app/superset-frontend

# Install all dependencies (including custom plugins)
RUN npm install --force

# Install Prettier globally
RUN npm install --global prettier

# Run Prettier to format files (optional)
RUN npx prettier --write . || echo "Prettier failed"


# Copy custom plugins into the frontend directory
COPY superset-frontend/customPlugins /app/superset-frontend/customPlugins

# Ensure the production build is properly built and ready for serving
RUN npm run build || echo "Final frontend build failed"

# Switch back to the default Superset user
USER superset

# Expose the ports used by Superset and Redis
EXPOSE 8088 6379

# Entry point to setup Superset
ENTRYPOINT ["/app/setup_superset.sh"]
