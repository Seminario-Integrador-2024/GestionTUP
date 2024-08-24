from django.db.models.manager import BaseManager
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views her

class AlumnoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Alumno] = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class InhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Inhabilitacion] = Inhabilitacion.objects.all()
    serializer_class = InhabilitacionSerializer


class TipoInhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoInhabilitacion] = TipoInhabilitacion.objects.all()
    serializer_class = TipoInhabilitacionSerializer

class TipoEstadoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoEstado] = TipoEstado.objects.all()
    serializer_class = TipoEstadoSerializer
