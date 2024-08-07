"""
Serializer for user login.

This module contains the `CustomLoginSerializer` class, which is used to \
    validate and authenticate user login credentials.

Raises:
    serializers.ValidationError: If the provided credentials are invalid.

Returns:
    dict: A dictionary containing the validated user login data.
"""

from typing import Any

from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class CustomLoginSerializer(serializers.Serializer):
    """
    Serializer for user login.

    This serializer is used to validate and authenticate user login credentials.

    Args:
        serializers.Serializer: The base serializer class.
    def update(self, instance, validated_data) -> None:
        pass

    Raises:
        serializers.ValidationError: If the provided credentials are invalid.

    Returns:
        dict: A dictionary containing the validated user login data.
    """

    email_or_username = serializers.CharField(required=True)
    password = serializers.CharField(style={"input_type": "password"})
    user: AbstractUser | None = None

    def validate(self, attrs) -> Any:
        """
        Validate the user login credentials.

        This method checks if the provided email/username and password are valid.
        If the credentials are valid, it returns a dictionary containing the validated data.
        Otherwise, it raises a `serializers.ValidationError` with an appropriate error message.

        Args:
            attrs (dict): A dictionary containing the user login data.

        Raises:
            serializers.ValidationError: If the provided credentials are invalid.

        Returns:
            dict: A dictionary containing the validated user login data.
        """
        email_or_username: str = attrs.get("email_or_username")
        password: str = attrs.get("password")

        if email_or_username and password:
            user: AbstractUser | None = authenticate(
                request=self.context["request"],
                username=email_or_username,
                password=password,
            )
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(detail=msg, code="authorization")
        else:
            msg: str = _('Must include "email_or_username" and "password".')
            raise serializers.ValidationError(detail=msg, code="authorization")

        attrs["user"] = user
        return attrs

    def create(self, validated_data) -> Any:
        return super().create(validated_data=validated_data)


# """
