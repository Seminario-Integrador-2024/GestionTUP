# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdministradorViewSet,
    AdminRolViewSet,
    PermisosViewSet,
    RolPermisoViewSet,
    RolViewSet,
)

router = DefaultRouter()
router.register(r"", AdministradorViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
