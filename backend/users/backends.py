# users/backends.py

"""
This module contains a custom authentication backend that allows users to\
    authenticate using either their email or username.
"""

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import AbstractUser
from django.db.models import Q

UserModel: type[AbstractUser] = get_user_model()


class EmailOrUsernameModelBackend(ModelBackend):
    """
    A custom authentication backend that allows users to authenticate using either\
        their email or username.

    :param ModelBackend: A class that extends the default Django ModelBackend.
    :return: A custom authentication backend.
    :raises: No exceptions raised.
    """

    def authenticate(
        self, request, username=None, password=None, **kwargs
    ) -> None | AbstractUser:
        """
        Authenticates a user based on their email or username.

        :param request: The request object.
        :param username: The username or email of the user.
        :param password: The password of the user.
        :param kwargs: Additional keyword arguments.
        :return: The user object if the username and password are correct, otherwise None.
        :raises: No exceptions raised.
        """
        try:
            user: AbstractUser = UserModel.objects.get(
                Q(username__iexact=username) | Q(email__iexact=username)
            )
        except UserModel.DoesNotExist:
            return None
        except UserModel.MultipleObjectsReturned:
            return None

        if password is not None and user.check_password(raw_password=password):
            return user
        return None

    def get_user(self, user_id: int) -> AbstractUser | None:
        """
        Retrieves a user object based on the user ID.

        :param user_id: The ID of the user.
        :return: The user object if the user exists, otherwise None.
        :raises: No exceptions raised.
        """
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
