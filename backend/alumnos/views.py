from django.db.models.manager import BaseManager
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from .models import *
from .serializers import *
from .paginations import AlumnoResultsSetPagination

# Create your views her

class AlumnosViewSet(viewsets.ModelViewSet):
    lookup_field = 'dni'
    queryset: BaseManager[Alumno] = Alumno.objects.all()
    pagination_class = AlumnoResultsSetPagination
    filter_backends = [OrderingFilter]
    ordering_fields = ['apellido']
    ordering = ['apellido']

    def get_serializer_class(self):
        # Usar el serializador adecuado según el método HTTP
        if self.request.method == 'GET' and self.action == 'retrieve':
            return AlumnoCreateSerializer
        elif self.request.method == 'GET':
            return AlumnoRetrieveSerializer 
        return AlumnoCreateSerializer  
    

class InhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Inhabilitacion] = Inhabilitacion.objects.all()
    serializer_class = InhabilitacionSerializer


class TipoInhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoInhabilitacion] = TipoInhabilitacion.objects.all()
    serializer_class = TipoInhabilitacionSerializer

class TipoEstadoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoEstado] = TipoEstado.objects.all()
    serializer_class = TipoEstadoSerializer
