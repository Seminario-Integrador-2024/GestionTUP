from django.shortcuts import render
from django.db.models.manager import BaseManager
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Materia, MateriaAlumno, Alumno
from .serializers import MateriaSerializer, AlumnoSerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class MateriaViewSet(viewsets.ModelViewSet):
    lookup_field = 'codigo_materia'
    queryset: BaseManager[Materia] = Materia.objects.all()
    serializer_class = MateriaSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['get'], url_path='alumnos')
    def alumnos(self, request, codigo_materia=None):
        """
        Custom action to get all students enrolled in a specific subject.
        """
        try:
            materia = self.get_object()  # Get the Materia instance by codigo_materia
            alumnos_relacionados = Alumno.objects.filter(materiaalumno__id_materia=materia)
            serializer = AlumnoSerializer(alumnos_relacionados, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Materia.DoesNotExist:
            return Response({'error': 'Materia not found'}, status=status.HTTP_404_NOT_FOUND)
