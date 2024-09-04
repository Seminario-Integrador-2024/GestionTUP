"""
This module contains the CustomUser model, which is \
    a custom user model that extends the default Django User model.

Attributes:
    email (EmailField): The email address of the user.
    USERNAME_FIELD (str): The field used as the unique identifier for \
        authentication (default is 'username').
    EMAIL_FIELD (str): The field used as the unique identifier for email (default is 'email').
    REQUIRED_FIELDS (list[str]): The fields required when creating a user.

Methods:
    __str__(): Returns the username of the user.

Meta:
    ordering (list[str]): The ordering of the CustomUser model.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class GenericUser(AbstractUser):
    email = models.EmailField(
        primary_key=True,
        verbose_name=_(message="email address"),
        unique=True,
        blank=False,
        null=False,
        db_index=True,
    )

    class Meta:
        # abstract: bool = True
        db_table: str = "Usuario"
        ordering: list[str] = ["-date_joined"]
