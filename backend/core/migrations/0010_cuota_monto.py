# Generated by Django 5.1 on 2024-08-13 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_rename_monto_cuota_compdepago'),
    ]

    operations = [
        migrations.AddField(
            model_name='cuota',
            name='monto',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
