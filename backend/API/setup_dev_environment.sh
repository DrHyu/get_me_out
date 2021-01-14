#!/bin/bash

virtualenv -p python3.8 venv
source venv/bin/activate
cd gmo_backend
apt-get -y update  &&  apt-get install -y python3-dev
pip install --upgrade pip
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate --run-syncdb
python manage.py collectstatic --noinput