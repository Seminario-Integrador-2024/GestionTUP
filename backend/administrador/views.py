from rest_framework import viewsets
from django.db.models.manager import BaseManager
from .models import *
from .serializers import *


# Create your views here.


class AdministradorViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Administrador] = Administrador.objects.all()
    serializer_class = AdministradorSerializer


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
