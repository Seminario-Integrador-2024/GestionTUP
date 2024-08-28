import pandas as pd
from django.core.files.base import ContentFile
from django.db.models.manager import BaseManager
from excel_sysacad.utils import load_excel, validate_excel

#  third party imports
from rest_framework import serializers
from rest_framework.exceptions import (
    APIException,
    MethodNotAllowed,
    NotAcceptable,
    NotAuthenticated,
    NotFound,
    ParseError,
    PermissionDenied,
    Throttled,
    UnsupportedMediaType,
    ValidationError,
)

#  custom imports
from .models import ExcelFile


class ExcelUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExcelFile
        fields = "__all__"

    def validate_file(self, value, *args, **kwargs):
        """
        if file already exists, stop the upload and return the existing file

        Args:
            value (File): The file to be validated.

        Raises:
            serializers.ValidationError: If the file already exists in the database

        Returns:
            File | None : The file if it passes the validation.
        """
        if ExcelFile.objects.filter(file=value).exists():
            raise ValidationError("El archivo ya existe.")
        if value.size > 1024 * 1024 * 10:
            raise ValidationError("El archivo es demasiado grande.")
        if not value.name.endswith(".xlsx"):
            raise ValidationError("El archivo debe ser de tipo Excel.")
        if not value.name.startswith("Sysacad"):
            raise ValidationError("El archivo debe tener el prefijo 'Sysacad'.")
        # file manipulation with pandas
        # pandas documentation:
        # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html

        col_header = 6  # header row with column names in the excel file

        # read the file
        df: pd.DataFrame = pd.read_excel(
            # io=path,
            io=value,
            header=col_header - 1,
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
            # skiprows=col_header + 1,
            engine="openpyxl",
        )
        # make index start at 6
        df.index = df.index + col_header + 1

        invalid_rows = validate_excel(df)
        # return the data as json
        if not invalid_rows.empty:
            invalid_rows = invalid_rows.to_json(orient="index")
            raise ValidationError(
                {
                    "detail": "Archivo Excel inválido.",
                    "invalid_rows": invalid_rows,
                }
            )
        else:
            # save the file to the database
            from .utils import load_excel

            duplicates = load_excel(df)

            if not duplicates.empty:
                duplicates = duplicates.to_json(orient="index")
                raise ValidationError(
                    {
                        "detail": "existen registros duplicados que no se cargaron.",
                        "duplicates": duplicates,
                    }
                )
