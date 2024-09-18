#!/bin/bash
set -e

export SUPERSET_CONFIG_PATH=/app/superset_config.py
source /app/venv/bin/activate

# Initialize the database
superset db upgrade

# Create default roles and permissions
superset init
# Start the Celery worker and beat
celery -A superset.tasks.celery_app worker --loglevel=info &
celery -A superset.tasks.celery_app beat --loglevel=info &

# Create an admin user
flask fab create-admin \
    --username admin \
    --firstname Superset \
    --lastname Admin \
    --email admin@superset.com \
    --password admin

# Start the web server
gunicorn -w 2 -k gevent --timeout 120 -b 0.0.0.0:8088 "superset.app:create_app()"



# #!/bin/bash
# export SUPERSET_CONFIG_PATH=$(pwd)/superset_config.py
# # export SUPERSET_CONFIG_PATH=/app/superset_config.py
# source venv/bin/activate

# #  . /app/newapp/superset/venv/bin/activate
# superset db upgrade
# # Create admin user if it doesn't exist
# if ! superset fab list-users | grep -q 'admin'; then
#     superset fab create-admin \
#         --username admin \
#         --firstname Admin \
#         --lastname User \
#         --email admin@example.com \
#         --password admin
# fi

# superset load-examples
# superset init

# gunicorn \
#       -w 10 \
#       -k gevent \
#       --timeout 120 \
#       -b  0.0.0.0:8088 \
#       --limit-request-line 0 \
#       --limit-request-field_size 0 \
#       --statsd-host localhost:8125 \
#       "superset.app:create_app()"
