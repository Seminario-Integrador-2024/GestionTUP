# serializers.py
from dj_rest_auth.serializers import LoginSerializer
from django.conf import settings
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = (
            "email",
            "username",
            "first_name",
            "last_name",
            "phone_number",
            "is_active",
            "is_staff",
            "is_superuser",
        )


class LoginSerializerMixins(
    LoginSerializer,
):
    # username = None
    # email = serializers.EmailField(required=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ("email", "password")

    def validate(self, attrs):
        if settings.AUTHENTICATION_METHOD == "email":
            if attrs.get("email"):
                attrs["username"] = attrs.get("email")
        return super().validate(attrs)
