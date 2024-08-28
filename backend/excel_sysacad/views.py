"""
    Description: This module contains the views for the excel_sysacad app.

    Returns:
        ExcelViewSet: The viewset for the ExcelFile model.
    """

from django.db.models.manager import BaseManager
from rest_framework import viewsets
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .models import ExcelFile
from .serializers import ExcelUploadSerializer

# third party imports


# Create your views here.
class ExcelViewSet(viewsets.ModelViewSet):
    """
    ExcelViewSet ViewSet for the ExcelFile model.

    Args:
        viewsets (ModelViewSet): The ModelViewSet class from the rest_framework module.

    Returns:
        ExcelViewSet: The viewset for the ExcelFile model.
    """

    queryset: BaseManager[ExcelFile] = ExcelFile.objects.all()
    serializer_class = ExcelUploadSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    lookup_field = "id_excel"


if __name__ == "__main__":
    pass
