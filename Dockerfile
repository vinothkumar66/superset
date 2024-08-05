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
