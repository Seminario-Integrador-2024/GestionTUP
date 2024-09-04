"""
     !? This file is for prod settings only. Do not use this in development. Use dev.py instead.
     you cannot hardcode any sensitive information here. Use environment variables instead.
     it should have the same structure as django_default.py but with production settings and having base.py as the base settings file.
    """

import os
import secrets
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

from .base import *  # noqa

# Variables and Secrets.
load_dotenv()

from corsheaders.defaults import default_headers, default_methods

load_dotenv()


# Path: backend/server/settings/prod.py
SECRET_KEY: str = os.getenv(
    key="DJANGO_SECRET_KEY", default=secrets.token_urlsafe(nbytes=128)
)

# allowed hosts
ALLOWED_HOSTS: list[str] = [
    "https://gestiontup-1.onrender.com/",  # https
    "http://gestiontup-1.onrender.com",  # http
]


# CORS settings
# CORS Docs: https://pypi.org/project/django-cors-headers/
# CORS_ALLOWED_ORIGINS_REGEXES: list[str] = [
#     r"^https?://*\.onrender\.com$",  # https://gestiontup-1.onrender.com/
# ]
# frontend allowed ["https://gestiontup-1.onrender.com/"]
# CSRF_TRUSTED_ORIGINS = ["http://*", "https://*"]
#
# CORS_URLS_REGEX = (
#     r"^https?://*/api/*$"  # only allow CORS for domains that contain /api/ in the URL
# )
CORS_ALLOW_METHODS = (*default_methods,)

CORS_ALLOW_HEADERS = (*default_headers,)

# CORS_ALLOW_CREDENTIALS = False  # default is False
# CSRF_TRUSTED_ORIGINS = [
#     "https://read-and-write.example.com",
# ]

# rest_framework settings
REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"] = [
    "rest_framework.permissions.IsAuthenticatedOrReadOnly",
]
# https://django-storages.readthedocs.io/en/latest/index.html
STORAGES = {
    "default": {
        "BACKEND": "storages.backends.gcloud.GoogleCloudStorage",
        "OPTIONS": {
            #   ...your_options_here
        },
    },
    "staticfiles": {
        "BACKEND": "storages.backends.gcloud.GoogleCloudStorage",
    },
}
# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# Serve media files from GCP Bucket
GS_BUCKET_NAME = "gs-tup"

# set rules for password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 9,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

REST_AUTH["JWT_AUTH_SECURE"] = True
REST_AUTH["JWT_AUTH_HTTPONLY"] = True


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
