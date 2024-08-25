from django.core.files.base import ContentFile
from .models import *
#  third party imports
from rest_framework import serializers


#  custom imports
from .models import *

class MateriaAlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MateriaAlumno
        fields = "__all__"


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = "__all__"

