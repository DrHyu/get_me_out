#!/bin/bash

################################ DEV ONLY ################################
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
python3 manage.py collectstatic --noinput
##########################################################################

exec gunicorn gmo_backend.wsgi:application --bind 0.0.0.0:8080 --workers 3