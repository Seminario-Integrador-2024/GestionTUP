"""
This module contains the configuration for the Users app.

It defines the `UsersConfig` class, which is responsible for configuring the Users app in Django.
"""

from django.apps import AppConfig


class UsersConfig(AppConfig):
    """Users app config"""

    default_auto_field: str = "django.db.models.BigAutoField"
    name = "users"
