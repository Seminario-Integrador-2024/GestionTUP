# users/admin.py
"""
This module is responsible for registering the CustomUser model in the Django admin site.

It imports the CustomUser model from the users.models module \
    and registers it using the admin.site.register() function.

Example usage:
    admin.site.register(CustomUser)
"""
from django.contrib import admin
from users.models import CustomUser

# Register your models here.

admin.site.register(model_or_iterable=CustomUser)
