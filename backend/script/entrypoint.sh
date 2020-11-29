#!/bin/bash

################################ DEV ONLY ################################
python3 manage.py makemigrations
python3 manage.py migrate auth
python3 manage.py migrate --run-syncdb
python3 manage.py loaddata fixtures/*.json
python3 manage.py collectstatic --noinput
python3 manage.py shell -c "from users.models import User;   User.objects.create_superuser('admin', 'admin@example.com', 'yolo')"

##########################################################################

exec gunicorn gmo_backend.wsgi:application --bind 0.0.0.0:8080 --workers 3