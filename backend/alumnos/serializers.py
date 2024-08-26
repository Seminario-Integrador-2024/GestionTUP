from django.core.files.base import ContentFile
from django.urls import reverse
from .models import *
#  third party imports
from rest_framework import serializers

#  custom imports
from .models import *


class AlumnoRetrieveSerializer(serializers.ModelSerializer):
    alumno_link = serializers.SerializerMethodField()

    class Meta:
        model = Alumno
        exclude = ['telefono', 'celular', 'user', "id"]
    
    def get_alumno_link(self, obj):
        request = self.context.get('request')
        if request is not None:
            base_url = request.build_absolute_uri('/')
            if obj.dni:
                return f"{base_url}alumnos/{obj.dni}/"
        return None

class AlumnoCreateSerializer(serializers.ModelSerializer):
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