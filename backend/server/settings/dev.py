import os
from datetime import timedelta

from dotenv import load_dotenv

from .base import(  # ACCOUNT_AUTHENTICATION_METHOD,; ACCOUNT_EMAIL_REQUIRED,; ACCOUNT_EMAIL_VERIFICATION,
    ACCOUNT_AUTHENTICATION_METHOD,
    ACCOUNT_EMAIL_REQUIRED,
    ACCOUNT_EMAIL_VERIFICATION,
    AUTH_USER_MODEL,
    AUTHENTICATION_BACKENDS,
    BASE_DIR,
    MOUNTED_BUCKET_ROOT,
    STATIC_ROOT,
    STATIC_URL,
    MEDIA_ROOT,
    MEDIA_URL,
    CORS_ALLOW_ALL_ORIGINS,
    DATABASES,
    DEFAULT_AUTO_FIELD,
    EMAIL_BACKEND,
    INSTALLED_APPS,
    MIDDLEWARE,
    REST_AUTH,
    REST_FRAMEWORK,
    ROOT_URLCONF,
    SECRET_KEY,
    SIMPLE_JWT,
    SITE_ID,
    SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT,
    SPECTACULAR_SETTINGS,
    STATIC_URL,
    TEMPLATES,
    WSGI_APPLICATION,
)

load_dotenv()

APPEND_SLASH = True

DEBUG = True

DEBUG_PROPAGATE_EXCEPTIONS = False

ALLOWED_HOSTS: list[str] = ["localhost", "127.0.0.1"]

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

INTERNAL_IPS: list[str] = [
    # ...
    "127.0.0.1",
    # ...
]

# Static files (CSS, JavaScript, images)
logs_dir: str = os.path.join(BASE_DIR, "logs")
os.makedirs(name=logs_dir, exist_ok=True)

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(seconds=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(seconds=60),
}


# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} \
                {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": os.path.join(logs_dir, "general.log"),
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 5,
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": True,
        },
    },
}
