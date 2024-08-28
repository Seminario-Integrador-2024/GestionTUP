from django.core.validators import FileExtensionValidator
from django.db import models

# Create your models here.


class ExcelFile(models.Model):
    id_excel = models.AutoField(primary_key=True)
    file = models.FileField(
        upload_to="excel_files/",
        validators=[
            FileExtensionValidator(allowed_extensions=["xls", "xlsx"]),
            # allowed_extensions=["xls", "xlsx"]
        ],
    )
    fecha_subido = models.DateTimeField(auto_now_add=True)

    # get the file name of the uploaded file
    @property
    def get_file(self):
        return self.file
