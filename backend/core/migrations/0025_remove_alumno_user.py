# Generated by Django 5.1 on 2024-08-17 21:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0024_delete_excelfile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumno',
            name='user',
        ),
    ]
