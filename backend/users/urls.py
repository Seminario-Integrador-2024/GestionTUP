# users/urls.py
"""
This module defines the URL patterns for the users app.

The urlpatterns list contains the URL patterns for the users app. It includes the base URLs for authentication and registration using the dj_rest_auth library.

URL Patterns:
- "" (empty string): Includes the URLs for authentication using dj_rest_auth.
- "signup/": Includes the URLs for registration using dj_rest_auth.registration.

Note: This module is imported and used in the project's main URL configuration file.
"""
from django.urls import include, path
from users.views import GoogleLogin

# base urls
urlpatterns: list = [
    path("", include("dj_rest_auth.urls"), name="rest_auth"),
    path("signup/", include("dj_rest_auth.registration.urls"), name="rest_auth_signup"),
    path()
]
