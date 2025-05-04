FROM python:3.12-alpine

LABEL maintainer="Some Dev"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_NO_INTERACTION=1 \
    DEBIAN_FRONTEND=noninteractive \
    COLUMNS=80

RUN apk update
RUN apk add --no-cache gcc musl-dev mariadb-dev curl

RUN mkdir /app
WORKDIR /app

RUN pip install poetry

COPY pyproject.toml /app/

RUN poetry config virtualenvs.create false
RUN poetry lock
RUN poetry install --no-root