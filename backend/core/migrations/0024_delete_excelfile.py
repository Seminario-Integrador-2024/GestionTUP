# Generated by Django 5.1 on 2024-08-17 20:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0023_rename_curatrimestre_compromisodepago_cuatrimestre'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ExcelFile',
        ),
    ]