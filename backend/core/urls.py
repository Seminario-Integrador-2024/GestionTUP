# core/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
#router.register(r"materias", MateriaViewSet)
#router.register(r"alumnos", AlumnoViewSet)
#router.register(r"materia-alumnos", MateriaAlumnoViewSet)
router.register(r"compromisos", CompromisoDePagoViewSet)
router.register(r"pagos", PagoViewSet)
router.register(r"cuotas", CuotaViewSet)
#router.register(r"inhabilitaciones", InhabilitacionViewSet)
#router.register(r"tipo-inhabilitaciones", TipoInhabilitacionViewSet)
router.register(r"administradores", AdministradorViewSet)
#router.register(r"tipo-estados", TipoEstadoViewSet)
router.register(r"roles", RolViewSet)
router.register(r"permisos", PermisosViewSet)
router.register(r"admin-roles", AdminRolViewSet)
router.register(r"rol-permisos", RolPermisoViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
