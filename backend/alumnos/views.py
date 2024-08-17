from django.db.models.manager import BaseManager
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class MateriaViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Materia] = Materia.objects.all()
    serializer_class = MateriaSerializer


class AlumnoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Alumno] = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class MateriaAlumnoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[MateriaAlumno] = MateriaAlumno.objects.all()
    serializer_class = MateriaAlumnoSerializer

class InhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Inhabilitacion] = Inhabilitacion.objects.all()
    serializer_class = InhabilitacionSerializer


class TipoInhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoInhabilitacion] = TipoInhabilitacion.objects.all()
    serializer_class = TipoInhabilitacionSerializer

class TipoEstadoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoEstado] = TipoEstado.objects.all()
    serializer_class = TipoEstadoSerializer
