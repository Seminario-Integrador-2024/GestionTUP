# Generated by Django 5.1 on 2024-08-13 04:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_remove_cuota_monto'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cuota',
            old_name='firmado',
            new_name='pagada',
        ),
    ]