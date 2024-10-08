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
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        # "NAME": "postgres",
        "NAME": os.getenv(
            "DB_NAME", "db"
        ),  # name of the database, same for mysql and postgres, it will be created if it doesn't exist
        # "USER": "postgres/mysql",
        "USER": os.getenv("DB_USER", "mysql"),
        # "PASSWORD": "postgres/mysql",
        "PASSWORD": os.getenv("DB_PASSWORD", "mysql"),
        # "HOST": "postgres/mysql/some-other-docker-service-name",
        "HOST": os.getenv("DB_HOST", "mysql"),  # name of docker-compose service
        # "PORT": "5432/3306",
        "PORT": os.getenv("DB_PORT", "3306"),
    }
}
# logs directory for development environment and create it if it doesn't exist
logs_dir: str = os.path.join(BASE_DIR, "logs")
os.makedirs(name=logs_dir, exist_ok=True)


LOGGING["handlers"]["console"]["level"] = "DEBUG"
LOGGING["loggers"]["django"]["level"] = "DEBUG"
