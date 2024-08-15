# core/views.py

# django imports
from django.db.models.manager import BaseManager
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
# third party imports
from rest_framework import viewsets

# custom imports
from .models import (
    Administrador,
    AdminRol,
    Alumno,
    CompromisoDePago,
    Cuota,
    Inhabilitacion,
    Materia,
    MateriaAlumno,
    Pago,
    Permisos,
    Rol,
    RolPermiso,
    TipoEstado,
    TipoInhabilitacion,
    
    ExcelFile,
)
from .serializers import (
    AdministradorSerializer,
    AdminRolSerializer,
    AlumnoSerializer,
    CompromisoDePagoSerializer,
    CuotaSerializer,
    InhabilitacionSerializer,
    MateriaAlumnoSerializer,
    MateriaSerializer,
    PagoSerializer,
    PermisosSerializer,
    RolPermisoSerializer,
    RolSerializer,
    TipoEstadoSerializer,
    TipoInhabilitacionSerializer,

    ExcelUploadSerializer,
)

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


class CompromisoDePagoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[CompromisoDePago] = CompromisoDePago.objects.all()
    serializer_class = CompromisoDePagoSerializer


class PagoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Pago] = Pago.objects.all()
    serializer_class = PagoSerializer


class CuotaViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Cuota] = Cuota.objects.all()
    serializer_class = CuotaSerializer


class InhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Inhabilitacion] = Inhabilitacion.objects.all()
    serializer_class = InhabilitacionSerializer


class TipoInhabilitacionViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoInhabilitacion] = TipoInhabilitacion.objects.all()
    serializer_class = TipoInhabilitacionSerializer


class AdministradorViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Administrador] = Administrador.objects.all()
    serializer_class = AdministradorSerializer


class TipoEstadoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[TipoEstado] = TipoEstado.objects.all()
    serializer_class = TipoEstadoSerializer


class RolViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Rol] = Rol.objects.all()
    serializer_class = RolSerializer


class PermisosViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Permisos] = Permisos.objects.all()
    serializer_class = PermisosSerializer


class AdminRolViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[AdminRol] = AdminRol.objects.all()
    serializer_class = AdminRolSerializer


class RolPermisoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[RolPermiso] = RolPermiso.objects.all()
    serializer_class = RolPermisoSerializer



class ExcelUploadViewSet(viewsets.ModelViewSet):
    queryset = ExcelFile.objects.all()
    serializer_class = ExcelUploadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    queryset: BaseManager[ExcelFile] = ExcelFile.objects.all()
    serializer_class = ExcelUploadSerializer
