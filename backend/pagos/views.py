# django imports
from django.db.models.manager import BaseManager
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
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
        

class UltimoCompromisoDePago(APIView):
    
    def get(self, request):
        ultimo_compromiso = CompromisoDePago.objects.order_by('-fecha_carga_comp_pdf').first()
        if ultimo_compromiso is not None:
            serializer = CompromisoDePagoSerializer(ultimo_compromiso, context={'request': request})
            return Response(serializer.data)
        return Response({"detail": "No data found."}, status=status.HTTP_404_NOT_FOUND) 




class FirmaCompPagoAlumnoViewSets(viewsets.ModelViewSet):
    lookup_field = "alumno_id"
    serializer_class = FirmaCompPagoAlumnoSerializer

    def get_queryset(self):
        alumno_id = self.kwargs.get(self.lookup_field)

        ultimo_compromiso = CompromisoDePago.objects.order_by('-fecha_carga_comp_pdf').first()

        if not ultimo_compromiso:
            return FirmaCompPagoAlumno.objects.none()

        firma_ultimo_comp = FirmaCompPagoAlumno.objects.filter(
            alumno_id=alumno_id,
            compromiso_de_pago_id=ultimo_compromiso.id_comp_pago
        )

        if not firma_ultimo_comp.exists():
            return FirmaCompPagoAlumno.objects.none()

        return firma_ultimo_comp

    def retrieve(self, request, *args, **kwargs):
        ultimo_compromiso = CompromisoDePago.objects.order_by('-fecha_carga_comp_pdf').first()

        if not ultimo_compromiso:
            return Response({"detail": "No payment commitments found"}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.get_queryset()

        if not queryset.exists():
            return Response({"detail": "No student signatures were found."}, status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


"""


Sección "Compromiso de pago".
Camino feliz
1 El alumno entra a la sección "Compromiso de pago".
2 El sistema infroma al alumno que firmó el ultimo compromiso de pago y se le muestra el pdf con detalles de fecha y hora (opcional).
Camino alternativo
1.1. No tiene firmado el ultimo compromiso de pago. Se le debe informar que no esta firmado y "obligarle" a que firme.
1.2. El alumno firma.
1.3. El se registra la firma.


Al entrar a la seccion de "Compromiso de Pago" se debe mostar el último compromiso con la respuesta de este 
endpoint "[1][GET] http://localhost:8000/pagos/ultimo-compr-de-pag/" 

Para saber si firmo o no se le debe preguntar a este endpoint "[2][GET] http://localhost:8000/pagos/firmar-compromiso/<dni de alumno>/"

--Si firmó el último compromiso (el actual) se le debe mostar la fecha y hora(opcional) del día que que lo hizo (en la response del endpoint [2] esta eso),
--Si no firmó se le debe "obligar" al alumno a que firme mandando una peticioón a este endpoint 
    "[2][PUSH] http://localhost:8000/pagos/firmar-compromiso/" con este body "{"alumno": <dni de alumno>,  "compromiso_de_pago": <id de compromiso de pago> }"


"""