"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os

# Variables and Secrets.
import secrets
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY: str = os.getenv(
    key="DJANGO_SECRET_KEY", default=secrets.token_urlsafe(nbytes=128)
)

ALLOWED_HOSTS: list[str] = ["*"]


CORS_ALLOW_ALL_ORIGINS = True

APPEND_SLASH = False

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# https://docs.djangoproject.com/en/5.0/ref/settings/#std:setting-BASE_DIR
BASE_DIR: Path = (
    Path(__file__).resolve().parent.parent
)  # this is the root of the project


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!

# Application definition
# https://docs.djangoproject.com/en/5.0/ref/settings/#installed-apps
INSTALLED_APPS: list[str] = [
    # django default
    "grappelli",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # third party apps
    "rest_framework",
    "rest_framework.authtoken",
    "dj_rest_auth",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "dj_rest_auth.registration",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "drf_spectacular",
    "drf_spectacular_sidecar",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "whitenoise.runserver_nostatic",
    # local apps
    "users",
    "core",
    "pagos",
    "excel_sysacad",
    "alumnos",
    "excel_sysadmin",
    "mensajeria",
    "administrador",
]

# middleware settings
# https://docs.djangoproject.com/en/5.0/topics/http/middleware/
MIDDLEWARE: list[str] = [
    "corsheaders.middleware.CorsMiddleware",  # third party middleware for corsc
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # third party middleware for static files
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",  # third party middleware for allauth
]

ROOT_URLCONF = "server.urls"

# cache settings
# https://docs.djangoproject.com/en/5.0/topics/cache/

CACHES: dict[str, dict[str, str]] = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}


# DRF/ REST Framework settings
# https://www.django-rest-framework.org/api-guide/settings/
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "ALLOWED_VERSIONS": ["1.0.0"],
    "DEFAULT_VERSION": "1.0.0",
}

# Template settings
# https://docs.djangoproject.com/en/5.0/topics/templates/
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"

# Storage settings
# GCP Bucket settings
MOUNTED_BUCKET_ROOT: Path = BASE_DIR.parent / "mnt/my-bucket/"

os.makedirs(MOUNTED_BUCKET_ROOT, exist_ok=True)

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        # make sqlite db file in the root of the project
        "NAME": MOUNTED_BUCKET_ROOT / "db.sqlite3",
    }
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_ROOT: Path = MOUNTED_BUCKET_ROOT / "static"
STATIC_URL: str = "/static/"

MEDIA_ROOT: Path = MOUNTED_BUCKET_ROOT / "media"
MEDIA_URL: str = "/media/"


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS: list[str | None] = []

# CUSTOM USER MODEL SETTINGS
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-user-model
AUTH_USER_MODEL: str = "users.CustomUser"


# dj-rest-auth settings (with Registration & JWT enabled)
# https://dj-rest-auth.readthedocs.io/en/latest/configuration.html
REST_AUTH = {
    "LOGIN_SERIALIZER": "users.serializers.CustomLoginSerializer",
    "LOGOUT_SERIALIZER": "dj_rest_auth.serializers.LogoutSerializer",
    "USER_SERIALIZER": "dj_rest_auth.serializers.UserDetailsSerializer",
    "JWT_SERIALIZER": "api.serializers.CustomJWTSerializerWithExpiration",
    "TOKEN_MODEL": None,
    "TOKEN_CREATOR": None,
    "JWT_AUTH_RETURN_EXPIRATION": True,
    "PASSWORD_RESET_USE_SITES_DOMAIN": False,
    "OLD_PASSWORD_FIELD_ENABLED": False,
    "LOGOUT_ON_PASSWORD_CHANGE": False,
    "SESSION_LOGIN": False,
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "access_token",
    "JWT_AUTH_REFRESH_COOKIE": "refresh_token",
    "JWT_AUTH_REFRESH_COOKIE_PATH": "/",
    "JWT_AUTH_SECURE": False,
    "JWT_AUTH_HTTPONLY": False,
    "JWT_AUTH_SAMESITE": "Lax",
    "JWT_AUTH_COOKIE_USE_CSRF": False,
    "JWT_AUTH_COOKIE_ENFORCE_CSRF_ON_UNAUTHENTICATED": False,
}
# JWT settings
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
SIMPLE_JWT = {
    # JWT token settings
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(minutes=90),
    # JWT token blacklist settings
    "ROTATE_REFRESH_TOKENS": True,  # Enable refresh token rotation
    "BLACKLIST_AFTER_ROTATION": True,  # Blacklist tokens after rotation
}
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "username"
ACCOUNT_EMAIL_VERIFICATION = "none"
SITE_ID = 1

# Social Account settings
SOCIALACCOUNT_ONLY = True
SOCIAL_ACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT = True
SOCIALACCOUNT_PROVIDERS = {"google": {"EMAIL_AUTHENTICATION": True}}

AUTHENTICATION_BACKENDS: list[str] = [
    "users.backends.EmailOrUsernameModelBackend",
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "es-ar"

# set time zone to argentina
TIME_ZONE = "America/Argentina/Buenos_Aires"

USE_I18N = True

USE_TZ = True


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Test settings
# https://docs.djangoproject.com/en/5.0/topics/testing/overview/
TEST_RUNNER = "django.test.runner.DiscoverRunner"


# API Tooling
# https://zuplo.link//django-web


# DRF Spectacular settings
# https://drf-spectacular.readthedocs.io/en/latest/settings.html
SPECTACULAR_SETTINGS = {
    "TITLE": "Gestion TUP API",
    "DESCRIPTION": "API Endpoint Documentation for Gestion TUP",
    "VERSION": "0.1.0",
    "TOS": "https://github.com/samuop/GestionTUP/blob/main/README.md",
    "CONTACT": {
        "name": "API Support",
        "url": "https://github.com/carlosferreyra/GestionTUP",
        "email": "eduferreyraok@gmail.com",
    },
    "LICENSE": {
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    "SERVERS": [
        {
            "url": "{protocol}://{host}{port}/",
            "description": "Development server",
            "variables": {
                "protocol": {
                    "description": "Protocol (http only for now)",
                    "default": "https",
                    "enum": ["http", "https"],
                },
                "host": {
                    "description": "Hostname (FQDN)",
                    "default": "gestiontup-42tx6kvt3q-uc.a.run.app",
                    "enum": [
                        "gestiontup-42tx6kvt3q-uc.a.run.app",
                        "127.0.0.1",
                    ],
                },
                "port": {
                    "description": "server port",
                    "default": "",
                    "enum": ["", ":8000"],
                },
            },
        },
    ],
    "EXTERNAL_DOCS": {
        "description": "Click here for Swagger UI Specification Docs",
        "url": "https://swagger.io/specification/",
    },
    "EXTENSIONS_INFO": {
        "x-logo": {
            "url": "https://www.djangoproject.com\
                /m/img/logos/django-logo-negative.png",
            "backgroundColor": "#FFFFFF",
            "altText": "Django Logo",
        },
    },
    "EXTENSIONS_ROOT": {
        "x-logo": "x-logo",
    },
    "TAGS": [
        {
            "name": "api",
            "description": "API endpoint access, operations and schema.",
            "externalDocs": {
                "description": "API Schema Formatting - OpenAPI 3.0.3",
                "url": "https://spec.openapis.org/oas/v3.0.3#schema",
            },
        },
        {
            "name": "users",
            "description": "User operations, \
                including login, logout, signup, and password reset.",
            "externalDocs": {
                "description": "Included auth Library: dj-rest-auth[with_social]",
                "url": "https://dj-rest-auth.readthedocs.io/en/latest/",
            },
        },
        {
            "name": "core",
            "description": "Core operations, \
            including CRUD operations for the main models.",
        },
        {
            "name": "pagos",
            "description": "Pagos operations, \
            including CRUD operations for the pagos models.",
        },
        {
            "name": "excel_sysacad",
            "description": "Excel Sysacad operations, \
            including CRUD operations for the excel_sysacad models.",
        },
    ],
    "COMPONENT_SPLIT_REQUEST": True,
    "COMPONENT_NO_READ_ONLY_REQUIRED": True,
    "SWAGGER_UI_SETTINGS": {  # Swagger UI settings
        "deepLinking": True,
        "persist authorization": True,
        "showExtensions": True,  # Display vendor-specific extensions
        "showCommonExtensions": True,  # Display common extensions
        "docExpansion": "none",  # Expand operations by default
        "displayOperationId": True,  # Display operationId in operations
        # Appearance and Branding (mostly defaults)
        # Sorting and Filtering (mostly defaults)
        "filter": True,  # Show filtering {true, false, string}
        "operationsSorter": "alpha",  # Sort by method {alpha, method, ordered}
        "tagsSorter": "alpha",  # Sort by tag {alpha, order}
        "withCredentials": False,  # Avoid unless necessary
        "displayRequestDuration": True,  # Display request duration
        # Advanced Options (mostly defaults)
        "syntaxHighlight.activated": True,  # Syntax highlighter flag
        "url": "/api/schema/",  # URL to fetch the OpenAPI schema from
    },
    # OTHER SPECTACULAR SETTINGS
}
