# core/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r"compromisos", CompromisoDePagoViewSet)
router.register(r"pagos", PagoViewSet)
router.register(r"cuotas", CuotaViewSet)
router.register(r"firmas-compromisos", FirmaCompPagoAlumnoViewSets)


urlpatterns = [
    path("", include(router.urls)),
    path('compromisos/archivo/<int:pk>/', CompromisoDePagoViewSet.as_view({'get': 'retrieve_pdf'})),
]
