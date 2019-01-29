# Use an official Python runtime as a parent image
FROM python:3.7-slim as base_image
LABEL maintainer="hello@wagtail.io"

# Set environment varibles
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_ENV dev

RUN apt-get update \
        && apt-get install -y openssh-client \
        && pip install pipenv

RUN mkdir /code/
WORKDIR /code/
ADD . /code/

RUN pip install -r requirements.txt
