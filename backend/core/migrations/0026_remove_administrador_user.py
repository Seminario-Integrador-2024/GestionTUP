# Generated by Django 5.1 on 2024-08-17 22:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0025_remove_alumno_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='administrador',
            name='user',
        ),
    ]