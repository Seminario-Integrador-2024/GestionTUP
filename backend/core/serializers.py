# core/serializers.py
# apps imports
import base64
from django.core.files.base import ContentFile
from core.models import *
from core.serializers import *

#  third party imports
from rest_framework import serializers

#  custom imports
from users.models import *
from users.serializers import *
from .modelos.model_pagos import *

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
    archivo_pdf = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = MateriaAlumno
        fields = "__all__"


class CompromisoDePagoSerializer(serializers.ModelSerializer):
    archivo_pdf = serializers.FileField(write_only=True, required=False)
    class Meta:
        model = CompromisoDePago
        fields = "__all__"


class ExcelUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    class Meta:
        model = ExcelFile
        fields = "__all__"


class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"


class CuotaSerializer(serializers.ModelSerializer):
    monto = serializers.SerializerMethodField()

    class Meta:
        model = Cuota
        fields = "__all__"
        
    def get_monto(self, obj):
        compromiso_de_pago = obj.compdepago
        if compromiso_de_pago:
            return compromiso_de_pago.monto_completo
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('compdepago', None)
        return representation
        


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



