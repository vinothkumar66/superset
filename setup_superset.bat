@echo off

:: Extract the environment
tar -xzvf superset_env.tar.gz

:: Navigate to the venv directory
cd venv\Scripts

:: Activate the virtual environment
activate

:: Navigate to the Superset directory
cd ..\..

:: Install dependencies
pip install -r requirements.txt

:: Ensure the configuration is in place
set SUPERSET_CONFIG_PATH=%cd%\superset_config.py

:: Initialize the database
superset db upgrade

:: Create an admin user (adjust the credentials as needed)
set FLASK_APP=superset
superset fab create-admin --username admin --firstname Superset --lastname Admin --email admin@superset.com --password admin

:: Load examples (optional)
superset load_examples

:: Initialize Superset
superset init

:: Run Superset
superset run -p 8088 --with-threads --reload --debugger
