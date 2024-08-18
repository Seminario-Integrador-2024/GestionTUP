
from django.core.files.base import ContentFile

#  third party imports
from rest_framework import serializers

#  custom imports
from .models import *

class ExcelUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    class Meta:
        model = ExcelFileSysAdmin
        fields = "__all__"