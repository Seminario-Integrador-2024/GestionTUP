from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r"", MateriaViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
