"""
    Description: This module contains the views for the excel_sysacad app.

    Returns:
        ExcelViewSet: The viewset for the ExcelFile model.
    """

import pandas as pd
import rest_framework.exceptions as ex
from django.db.models.manager import BaseManager
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ExcelFile
from .serializers import ExcelUploadSerializer
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

    @action(detail=False, methods=["POST"], url_path="validar_excel")
    def validar_excel(self, request, *args, **kwargs):
        """
        Recibe un archivo Excel y:
        1) Valida que el archivo
        2) Si el archivo es válido, lo carga en la base de datos
        2.1) Si el archivo es válido, devuelve duplicados en la base de datos.
        3) Si el archivo no es válido, devuelve las JSON filas inválidas.


        Args:
            request (Request): The request object containing the Excel file.

        Returns:
            response (Response): The response object with the following status codes:
            _ 201_Created: The Excel file was successfully validated and loaded into the database.
            _ 206_Partial_Content: a JSON response with the invalid rows from excel.
            _ 400_Bad_Request: Something went wrong while parsing the Excel file.
            _ 404_Not_Found: No file was found in the request.
            _ 500_Internal_Server_Error: Something went wrong while loading the Excel file into the database.
        """

        try:
            # get the file from the request
            file = request.FILES["file"]
            # file manipulation with pandas
            # pandas documentation:
            # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html
            # read the file
            col_header = 6  # header row with column names in the excel file
            try:
                # read the file
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
                    skiprows=col_header - 1,
                    engine="openpyxl",
                )
                # make index start at 6
                df.index = df.index + col_header + 1

                invalid_rows = validate_excel(df)
                # return the data as json
                if not invalid_rows.empty:
                    return Response(
                        invalid_rows.to_json(orient="index"),
                        status=status.HTTP_206_PARTIAL_CONTENT,
                    )
                else:
                    from .utils import load_excel

                    load_excel(df)
                    return Response(
                        {
                            "detail": "Archivo Excel válido, se cargará en la base de datos."
                        },
                        status=status.HTTP_200_OK,
                    )
            except pd.errors.ParserError:
                return Response(
                    {"detail": "Archivo Excel inválido."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except ExcelFile.DoesNotExist:
            return Response(
                {"detail": "No se encontró el archivo en la solicitud."},
            )
        except ExcelFile.MultipleObjectsReturned:
            return Response(
                {
                    "detail": "Mas de un archivo encontrado en el request., solo se puede cargar un archivo a la vez."
                },
                status=status.HTTP_409_CONFLICT,
            )
        except ex.UnsupportedMediaType as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        except ex.Throttled as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )


if __name__ == "__main__":
    pass
