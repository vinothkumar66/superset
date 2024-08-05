# # Stage 1: Build the frontend
# FROM node:16 AS builder

# # Set working directory
# WORKDIR /app

# # Copy the frontend code into the container
# COPY superset-frontend /app/superset-frontend

# # Install dependencies and build the frontend
# WORKDIR /app/superset-frontend
# RUN npm install && npm run build

# # Stage 2: Set up the Superset image
# FROM apache/superset:latest

# # Set the working directory
# WORKDIR /app

# # Copy custom files
# COPY superset_config.py /app/superset_config.py
# COPY setup_superset.sh /app/setup_superset.sh
# COPY requirements /app/requirements

# # Install dependencies and setup environment
# USER root
# RUN apt-get update && \
#     apt-get install -y build-essential python3-venv pkg-config libmariadb-dev && \
#     pip install --upgrade pip mysqlclient && \
#     python3 -m venv /app/venv && \
#     /app/venv/bin/pip install -r /app/requirements/base.txt

# # Switch to the superset user
# USER superset

# # Set environment variable for the custom config
# ENV SUPERSET_CONFIG_PATH=/app/superset_config.py

# # Copy the built frontend code from the builder stage
# COPY --from=builder /app/superset-frontend/dist /app/superset_home/static/assets/

# # Run the setup script
# ENTRYPOINT ["/app/setup_superset.sh"]

# # Expose the port Superset runs on
# EXPOSE 8088
FROM apache/superset:latest
USER root
# Create virtual environment
RUN python3 -m venv venv
# Install any necessary packages and tools
RUN apt-get update && apt-get install -y build-essential python3-venv pkg-config libmariadb-dev

# Copy the custom configuration files
COPY superset_config.py /app/superset_config.py
COPY setup_superset.sh /app/setup_superset.sh
COPY requirements /app/requirements

# Ensure the script has execution permissions
RUN chmod +x /app/setup_superset.sh

# Setup the environment
RUN pip install --upgrade pip setuptools wheel \
    && pip install -r /app/requirements/base.txt

USER superset
WORKDIR /app

ENTRYPOINT ["/app/setup_superset.sh"]
