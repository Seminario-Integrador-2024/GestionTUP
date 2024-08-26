from json import load

import pandas as pd
from django.db.models.manager import BaseManager
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *
from .utils import validate_excel

# third party imports


# Create your views here.
class ExcelViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[ExcelFile] = ExcelFile.objects.all()
    serializer_class = ExcelUploadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"], url_path="validar_excel")
    def validar_excel(self, request, pk):

        try:
            # get the file by pk
            file = self.get_object().file
            # file manipulation with pandas
            # pandas documentation:
            # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html
            # read the file
            COL_HEADER = 6  # header row with column names in the excel file
            df: pd.DataFrame = pd.read_excel(
                # io=path,
                io=file,
                # header=COL_HEADER - 1,
                names=[
                    "Extensión",
                    "Esp.",
                    "Ingr.",
                    "Año",
                    "Legajo",
                    "Documento",
                    "Apellido y Nombres",
                    "Comisión",
                    "Materia",
                    "Nombre de materia",
                    "Estado",
                    "Recursa",
                    "Cant.",
                    "Mail",
                    "Celular",
                    "Teléfono",
                    "Tel. Resid",
                    "Nota 1",
                    "Nota 2",
                    "Nota 3",
                    "Nota 4",
                    "Nota 5",
                    "Nota 6",
                    "Nota 7",
                    "Nota Final",
                    "Nombre",
                ],
                skiprows=COL_HEADER - 1,
                engine="openpyxl",
            )
            # make index start at 6
            df.index = df.index + COL_HEADER + 1

            result = validate_excel(df)
            # return the data as json
            if not result.empty:
                return Response(
                    result.to_json(orient="index"),
                    status=status.HTTP_206_PARTIAL_CONTENT,
                )
            else:
                from .utils import load_excel

                load_excel(df)
                return Response(
                    {"detail": "Archivo Excel válido, se cargará en la base de datos."},
                    status=status.HTTP_200_OK,
                )
        except ExcelFile.DoesNotExist:
            return Response(
                {"detail": "Archivo no encontrado."}, status=status.HTTP_404_NOT_FOUND
            )
        except pd.errors.ParserError:
            return Response(
                {"detail": "Archivo Excel inválido."},
                status=status.HTTP_400_BAD_REQUEST,
            )
