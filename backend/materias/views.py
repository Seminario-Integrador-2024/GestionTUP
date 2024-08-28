from django.shortcuts import render
from django.db.models.manager import BaseManager
from rest_framework import viewsets
from .models import Materia
from .serializers import MateriaSerializer

# Create your views here.
class MateriaViewSet(viewsets.ModelViewSet):
    lookup_field = 'codigo_materia'
    queryset: BaseManager[Materia] = Materia.objects.all()
    serializer_class = MateriaSerializer
