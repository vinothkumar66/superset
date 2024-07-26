# #!/bin/bash

# # Extract the environment
# tar -xzvf superset_env.tar.gz

# # Activate the virtual environment
# source venv/bin/activate

# # Install dependencies
# pip install -r requirements.txt

# # Ensure the configuration is in place
# export SUPERSET_CONFIG_PATH=$(pwd)/superset_config.py

# # Initialize the database
# superset db upgrade

# # Create an admin user (adjust the credentials as needed)
# export FLASK_APP=superset
# superset fab create-admin --username admin --firstname Superset --lastname Admin --email admin@superset.com --password admin

# # Load examples (optional)
# superset load_examples

# # Initialize Superset
# superset init

# # Run Superset
# superset run -p 8087 --with-threads --reload --debugger



export SUPERSET_CONFIG_PATH=$(pwd)/superset_config.py
source venv/bin/activate

#  . /app/newapp/superset/venv/bin/activate
superset db upgrade
superset init
superset load-examples
gunicorn \
      -w 10 \
      -k gevent \
      --timeout 120 \
      -b  0.0.0.0:8087 \
      --limit-request-line 0 \
      --limit-request-field_size 0 \
      --statsd-host localhost:8125 \
      "superset.app:create_app()"