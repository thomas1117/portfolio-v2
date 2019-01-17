# Use an official Python runtime as a parent image
FROM python:3.7-slim as base_image
LABEL maintainer="hello@wagtail.io"

# Set environment varibles
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_ENV dev

#RUN apk add --no-cache postgresql-client

RUN apt-get update \
        && apt-get install -y openssh-client \
        && pip install pipenv


# Copy the current directory contents into the container at /code/
COPY .. /code/
# Set the working directory to /code/
WORKDIR /code/


RUN useradd wagtail
RUN chown -R wagtail /code
USER wagtail

#COPY ../requirements.txt /code/requirements.txt
RUN pip install --upgrade pip
# Install any needed packages specified in requirements.txt
RUN pip install -r /code/requirements.txt
RUN pip install gunicorn

RUN python manage.py migrate

EXPOSE 8000
CMD exec gunicorn base.wsgi:application --bind 0.0.0.0:8000 --workers 3
