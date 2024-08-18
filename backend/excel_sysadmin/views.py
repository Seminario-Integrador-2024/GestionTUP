from .models import *
from .serializers import *

from django.db.models.manager import BaseManager
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
# third party imports
from rest_framework import viewsets

# Create your views here.
class ExcelSysAdminViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[ExcelFileSysAdmin] = ExcelFileSysAdmin.objects.all()
    serializer_class = ExcelUploadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)