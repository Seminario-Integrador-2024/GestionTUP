# core/serializers.py
# apps imports
from core.models import *
from core.serializers import *

#  third party imports
from rest_framework import serializers

#  custom imports
from users.models import *
from users.serializers import *

# Create your serializers here.


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = "__all__"


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = "__all__"


class MateriaAlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MateriaAlumno
        fields = "__all__"


class CompromisoDePagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompromisoDePago
        fields = "__all__"


class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"


class CuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuota
        fields = "__all__"


class InhabilitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inhabilitacion
        fields = "__all__"


class TipoInhabilitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoInhabilitacion
        fields = "__all__"


class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = "__all__"


class TipoEstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstado
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
