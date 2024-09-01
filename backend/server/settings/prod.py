"""
     !? This file is for prod settings only. Do not use this in development. Use dev.py instead.
     you cannot hardcode any sensitive information here. Use environment variables instead.
     it should have the same structure as django_default.py but with production settings and having base.py as the base settings file.
    """

import os
import secrets
from datetime import timedelta
from pathlib import Path

from django_storages import service_account
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
    "localhost",  # localhost
]


# CORS settings
# CORS Docs: https://pypi.org/project/django-cors-headers/
CORS_ALLOWED_ORIGINS_REGEXES: list[str] = [
    r"^https?://*\.onrender\.com$",  # https://gestiontup-1.onrender.com/
    r"^http://localhost:\d\d\d\d$",  # http://localhost with any port
]
# frontend allowed ["https://gestiontup-1.onrender.com/"]
# CSRF_TRUSTED_ORIGINS = ["http://*", "https://*"]
#
CORS_URLS_REGEX = (
    r"^https?://.*/api/.*$"  # only allow CORS for URLs that start with /api/
)
CORS_ALLOW_METHODS = (
    *default_methods,
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
)

CORS_ALLOW_HEADERS = (
    *default_headers,
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)

# CORS_ALLOW_CREDENTIALS = False  # default is False
CSRF_TRUSTED_ORIGINS = [
    "https://read-and-write.example.com",
]

# rest_framework settings
REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"] = [
    "rest_framework.permissions.IsAuthenticated",
]
# pip install django-storages[google]
# Storage settings
STORAGES["default"]["BACKEND"] = "storages.backends.gcloud.GoogleCloudStorage"
STORAGES["default"]["GS_BUCKET_NAME"] = "your-gcp-bucket-name"
STORAGES["default"]["GS_CREDENTIALS"] = (
    service_account.Credentials.from_service_account_file(
        "path/to/your/service_account_key.json"
    )
)

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
# https://potato-oss.gitlab.io/google-cloud/django-gcloud-connectors/installation/
DATABASES = {
    "default": {
        # gcloudc.db.backends.firestore
        # gcloudc.db.backends.datastore
        "ENGINE": "gcloudc.db.backends.firestore",
        "PROJECT": "YOUR_GCP_PROJECT_NAME",  # You can use djangae.environment.project_id() here
        "INDEXES_FILE": "PATH_TO_A_FILE_FOR_SPECICAL_INDEXES",
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_ROOT: Path = None  # Not using local static storage in prod
STATIC_URL: str = "/static/"

MEDIA_ROOT: Path = None  # Not using local media storage in prod
MEDIA_URL: str = "https://storage.googleapis.com/your-gcp-bucket-name/media/"

# Serve static files from GCP Bucket
STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
STATICFILES_BUCKET_NAME = "your-gcp-bucket-name"

# Serve media files from GCP Bucket
DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
GS_MEDIA_BUCKET_NAME = "your-gcp-bucket-name"

REST_AUTH["JWT_AUTH_SECURE"] = True
REST_AUTH["JWT_AUTH_HTTPONLY"] = True


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"


import logging

from google.cloud import logging as cloud_logging

# Create a Cloud Logging client
client = cloud_logging.Client()

# Define a Cloud Logging handler
cloud_handler = cloud_logging.handlers.CloudLoggingHandler(client)

# Add the handler to the root logger
logging.root.addHandler(cloud_handler)

# Set log level to WARNING or ERROR
# Remove file-based logging
del LOGGING["handlers"]["file"]

# Add Cloud Logging handler
LOGGING["handlers"]["cloud"] = {
    "level": "INFO",
    "class": "google.cloud.logging.handlers.CloudLoggingHandler",
    "client": cloud_logging.Client(),
}

# Update loggers to use Cloud Logging handler
for logger in LOGGING["loggers"].values():
    logger["handlers"].append("cloud")
