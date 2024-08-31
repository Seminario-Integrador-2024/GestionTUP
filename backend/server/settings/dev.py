import os

from dotenv import load_dotenv

from .base import *  # noqa

load_dotenv()

APPEND_SLASH = True

DEBUG = True

SECRET_KEY: str = os.getenv(
    key="DJANGO_SECRET_KEY", default=secrets.token_urlsafe(nbytes=128)
)
DEBUG_PROPAGATE_EXCEPTIONS = False

ALLOWED_HOSTS: list[str] = ["*"]

CORS_ALLOW_ALL_ORIGINS = True

INSTALLED_APPS += [
    # third party apps
    "whitenoise.runserver_nostatic",
    "debug_toolbar",
    "django_extensions",
    # local apps
]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

TEMPLATES[0]["OPTIONS"]["context_processors"] += [
    "django.template.context_processors.debug"
]

INTERNAL_IPS: list[str] = [
    # ...
    "127.0.0.1",
    # ...
]

# logs directory for development environment and create it if it doesn't exist
logs_dir: str = os.path.join(BASE_DIR, "logs")
os.makedirs(name=logs_dir, exist_ok=True)


LOGGING["handlers"]["console"]["level"] = "DEBUG"
LOGGING["loggers"]["django"]["level"] = "DEBUG"
