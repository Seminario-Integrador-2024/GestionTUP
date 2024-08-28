import pandas as pd
from django.core.files.base import ContentFile
from django.db.models.manager import BaseManager
from excel_sysacad.utils import validate_excel

#  third party imports
from rest_framework import  serializers
from rest_framework import exceptions as ex

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

        qs = ExcelFile.objects.filter(file__endswith=value.name)
        # check if the file already exists in the database
        if qs.exists():
            # return the existing file
            return qs.first().file
        else:
            # get the file from the request
            # file manipulation with pandas
            # pandas documentation:
            # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html
            # read the file
            col_header = 6  # header row with column names in the excel file
            try:
                # read the file
                df: pd.DataFrame = pd.read_excel(
                    # io=path,
                    io=value,
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
                    invalid_rows = invalid_rows.to_json(orient="index")
                    raise ex.ValidationError(
                        {
                            "detail": "Archivo Excel inválido.",
                            "invalid_rows": invalid_rows,
                        }
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
