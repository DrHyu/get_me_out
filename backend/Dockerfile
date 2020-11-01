# pull official base image
FROM python:3.8

# copy project
COPY ./gmo_backend /usr/src/app

# set work directory
WORKDIR /usr/src/app

# set environment variables

# install dependencies
RUN apt-get -y update  &&  apt-get install -y python3-dev
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate --run-syncdb
RUN python3 manage.py collectstatic --noinput
EXPOSE 8000

CMD exec gunicorn july_api.wsgi:application --bind 0.0.0.0:8000 --workers 3
