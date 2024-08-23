from rest_framework import serializers

from .models import Administrador, AdminRol, Permisos, Rol, RolPermiso


class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = "__all__"


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = "__all__"


class PermisosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permisos
        fields = "__all__"


class AdminRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminRol
        fields = "__all__"


class RolPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPermiso
        fields = "__all__"
