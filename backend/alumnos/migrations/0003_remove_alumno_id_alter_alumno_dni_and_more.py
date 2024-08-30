# Generated by Django 5.1 on 2024-08-29 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("alumnos", "0002_alumno_anio_ingreso_alumno_apellido_alumno_celular_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="alumno",
            name="id",
        ),
        migrations.AlterField(
            model_name="alumno",
            name="dni",
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="alumno",
            name="legajo",
            field=models.IntegerField(unique=True),
        ),
    ]
