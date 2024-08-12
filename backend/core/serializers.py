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
    archivo_pdf = serializers.CharField(write_only=True)  # Para recibir el base64

    class Meta:
        model = CompromisoDePago
        fields = "__all__"

    def create(self, validated_data):
        archivo_pdf_base64 = validated_data.pop('archivo_pdf', None)
        compromiso = validated_data.get('compromiso', 'default_name')
        perfciclo = validated_data.get('perfciclo', 'default_name')

        if archivo_pdf_base64:
            archivo_pdf_decoded = base64.b64decode(archivo_pdf_base64)
            archivo_pdf_name = f"{compromiso}_{perfciclo}.pdf"
            archivo_pdf = ContentFile(archivo_pdf_decoded, archivo_pdf_name)
            validated_data['archivo_pdf'] = archivo_pdf

        compromiso_de_pago = super().create(validated_data)
        
        compromiso_de_pago.compromiso = compromiso
        compromiso_de_pago.save()
        
        return compromiso_de_pago
    


class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"


class CuotaSerializer(serializers.ModelSerializer):
    monto = CompromisoDePagoSerializer()
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
