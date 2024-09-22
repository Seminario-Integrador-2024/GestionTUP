import pandas as pd
from rest_framework import serializers

from .models import ExcelFile
from .utils import load_data, validate_excel_file


class ExcelFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcelFile
        fields = ["file"]

    def validate_file(self, value):
        allowed_extensions = ["xlsx", "xls"]
        if not value.name.endswith(tuple(allowed_extensions)):
            raise serializers.ValidationError(
                "Only Excel files (.xlsx, .xls) are allowed"
            )

        try:
            COL_HEADER = 6
            df = pd.read_excel(
                io=value,
                header=COL_HEADER - 1,
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
        except Exception as e:
            raise serializers.ValidationError(
                f"Invalid Excel file: {str(e)}", code="invalid_excel_file"
            )

        df.index = df.index + COL_HEADER + 1

        # Validate Excel file format and return invalid rows
        try:
            invalid_rows = validate_excel_file(df)
            if not invalid_rows.empty:
                rows = invalid_rows.to_dict(orient="index")
                raise serializers.ValidationError(
                    {"invalid_rows": rows}, code="invalid_excel_content"
                )
        except Exception as e:
            raise serializers.ValidationError(
                f"Invalid Excel format: {str(e)}", code="invalid_excel_format"
            )

        # Check for duplicates
        columns_filter = ["Documento", "Materia", "Año"]
        duplicates = df[df.duplicated(subset=columns_filter, keep="first")]

        if not duplicates.empty:
            df = df.drop_duplicates(subset=columns_filter, keep="first")
            self.context["duplicates"] = duplicates.to_dict(orient="index")

        # Load data to the database
        load_data(df)

        if duplicates.empty:
            self.context["message"] = "Data successfully loaded without duplicates"
        else:
            self.context["message"] = (
                "Data loaded successfully. Duplicate rows were identified and not added to the database."
            )

        return value

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if "duplicates" in self.context:
            ret["duplicates"] = self.context["duplicates"]
        if "message" in self.context:
            ret["message"] = self.context["message"]
        return ret
