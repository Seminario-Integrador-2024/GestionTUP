# Generated by Django 5.1 on 2024-08-17 19:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0022_rename_compromiso_compromisodepago_curatrimestre_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='compromisodepago',
            old_name='curatrimestre',
            new_name='cuatrimestre',
        ),
    ]
