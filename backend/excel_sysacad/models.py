from django.db import models

# Create your models here.


class ExcelFile(models.Model):
    # get the file name of the uploaded file
    @property
    def get_file(self):
        return self.file
