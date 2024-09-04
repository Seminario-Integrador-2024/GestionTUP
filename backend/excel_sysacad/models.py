from django.db import models


class ExcelFile(models.Model):
    id_excel = models.AutoField(primary_key=True)
    file = models.FileField(upload_to="excel_files/")
    fecha_subido = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "excel_file"
        verbose_name = "Excel File"
        verbose_name_plural = "Excel Files"
