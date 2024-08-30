# Create your views here.

# from rest_framework import viewsets
# imports
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import (
    SocialAccountListView,
    SocialConnectView,
    SocialLoginView,
)


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000/accounts/google/login/callback/"
    client_class = OAuth2Client


class GoogleConnect(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000/accounts/google/login/callback/"
    client_class = OAuth2Client


class GoogleAccountList(SocialAccountListView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


google_login = GoogleLogin.as_view()
google_connect = GoogleConnect.as_view()
google_account_list = GoogleAccountList.as_view()
