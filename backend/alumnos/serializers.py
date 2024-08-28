from django.core.files.base import ContentFile
from django.urls import reverse

#  third party imports
from rest_framework import serializers

#  custom imports
from .models import *

class AlumnoRetrieveSerializer(serializers.ModelSerializer):
    alumno_link = serializers.SerializerMethodField()

    class Meta:
        model = Alumno
        exclude = ['telefono', 'celular', 'user', "id","cuil"]
    

    def get_alumno_link(self, obj):
        request = self.context.get('request')
        if request is not None:
            base_url = request.build_absolute_uri('/')
            if obj.dni:
                return f"{base_url}alumnos/{obj.dni}/"
        return None

class AlumnoCreateSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    cuil = serializers.IntegerField(required=False) 

    class Meta:
        model = Alumno
        fields = "__all__"


    def get_email(self,obj):
        user_email = obj.user
        if user_email is not None:
            return user_email.email
        return None

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