# Generated by Django 5.1 on 2024-08-28 04:52

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("excel_sysacad", "0002_alter_excelfile_file"),
    ]

    operations = [
        migrations.AlterField(
            model_name="excelfile",
            name="file",
            field=models.FileField(
                upload_to="excel_files/",
                validators=[
                    django.core.validators.FileExtensionValidator(["xls", "xlsx"])
                ],
            ),
        ),
    ]