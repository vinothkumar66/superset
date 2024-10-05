# FROM apache/superset:latest
# USER root
# # Create virtual environment
# RUN python3 -m venv venv
# # Install any necessary packages and tools
# RUN apt-get update && apt-get install -y build-essential python3-venv pkg-config libmariadb-dev

# # Copy the custom configuration files
# COPY superset_config.py /app/superset_config.py
# COPY setup_superset.sh /app/setup_superset.sh
# COPY requirements /app/requirements

# # Ensure the script has execution permissions
# RUN chmod +x /app/setup_superset.sh

# # Setup the environment
# RUN pip install --upgrade pip setuptools wheel \
#     && pip install -r /app/requirements/base.txt
# USER superset
# WORKDIR /app

# ENTRYPOINT ["/app/setup_superset.sh"]


# Stage 1: Use the Selenium image with Chrome
FROM selenium/standalone-chrome:latest AS chrome

# Stage 2: Use Apache Superset as the base
FROM apache/superset:latest

# Switch to root user to install additional packages
USER root

# Copy the ChromeDriver and Google Chrome from the Selenium image
COPY --from=chrome /usr/bin/chromedriver /usr/local/bin/chromedriver
COPY --from=chrome /opt/google/chrome /opt/google/chrome

# Install additional dependencies needed for Superset and Chrome
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
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Superset
ENV CHROME_BIN=/opt/google/chrome/google-chrome \
    CHROMEDRIVER_PATH=/usr/local/bin/chromedriver

# Set the working directory
WORKDIR /app

# Copy custom configuration files
COPY superset_config.py /app/superset_config.py
COPY setup_superset.sh /app/setup_superset.sh
COPY requirements /app/requirements

# Ensure the setup script has execution permissions
RUN chmod +x /app/setup_superset.sh

# Create and activate a virtual environment
RUN python3 -m venv /app/venv

# Upgrade pip and install Python dependencies
RUN . /app/venv/bin/activate && \
    pip install --upgrade pip setuptools wheel && \
    pip install -r /app/requirements/base.txt

# Switch back to the default Superset user
USER superset

# Entry point to setup Superset
ENTRYPOINT ["/app/setup_superset.sh"]

# Expose the port for Superset
EXPOSE 8088

