# users/seralizers.py
from dj_rest_auth.serializers import JWTSerializerWithExpiration
from drf_spectacular.utils import extend_schema_field
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.jwt_auth import (
    CookieTokenRefreshSerializer as DjRestAuthCookieTokenRefreshSerializer,
)


class CustomJWTSerializerWithExpiration(JWTSerializerWithExpiration):
    @extend_schema_field(
        field=UserDetailsSerializer,
    )
    def get_user(self, obj):
        """
        Required to allow using custom USER_DETAILS_SERIALIZER in
        JWTSerializer. Defining it here to avoid circular imports

        :param obj: The object to be serialized.
        :return: The serialized object.
        """
        return super().get_user(obj)
