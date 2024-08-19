from django.db import models

# Create your models here.

class ExcelFileSysAdmin(models.Model):
    id_excel = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='excel_files/')
    fecha_subido = models.DateTimeField(auto_now_add=True)