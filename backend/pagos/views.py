# django imports
from django.db.models.manager import BaseManager
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework import viewsets
from django.http import FileResponse
import os

# third party imports
from .serializers import *
from .paginations import CompDePagResultsSetPagination

class PagoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Pago] = Pago.objects.all()
    serializer_class = PagoSerializer


class CuotaViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Cuota] = Cuota.objects.all()
    serializer_class = CuotaSerializer

    
class CompromisoDePagoViewSet(viewsets.ModelViewSet):
    queryset = CompromisoDePago.objects.all()
    serializer_class = CompromisoDePagoSerializer
    pagination_class = CompDePagResultsSetPagination
    filter_backends = [OrderingFilter]
    ordering_fields = ['anio']
    ordering = ['anio']

    @action(detail=True, methods=['get'], url_path='archivo')
    def retrieve_pdf(self, request, pk=None):
        try:
            compromiso = self.get_object()
            if compromiso.archivo_pdf:
                # Extrae el nombre del archivo sin la ruta
                filename = os.path.basename(compromiso.archivo_pdf.name)
                response = FileResponse(compromiso.archivo_pdf.open(), content_type='application/pdf')
                response['Content-Disposition'] = f'inline ; filename="{filename}"'
                return response
            else:
                return Response({"detail": "El compromiso no tiene un archivo PDF asociado."}, status=status.HTTP_404_NOT_FOUND)
        except CompromisoDePago.DoesNotExist:
            return Response({"detail": "Compromiso no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        

class FirmaCompPagoAlumnoViewSets(viewsets.ModelViewSet):
    queryset: BaseManager[FirmaCompPagoAlumno] = FirmaCompPagoAlumno.objects.all()
    serializer_class = FirmaCompPagoAlumnoSerializer

"""

alumno 
compromiso_de_pago 
fecha_firmado 
firmado



"""