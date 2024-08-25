from django.core.files.base import ContentFile
from .models import *
#  third party imports
from rest_framework import serializers

#  custom imports
from .models import *

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = "__all__"


class InhabilitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inhabilitacion
        fields = "__all__"


class TipoInhabilitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoInhabilitacion
        fields = "__all__"


class TipoEstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstado
        fields = "__all__"