# Generated by Django 5.1 on 2024-08-18 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pagos', '0002_remove_compromisodepago_fecha_compr_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compromisodepago',
            name='fecha_carga_comp_pdf',
            field=models.DateTimeField(auto_now_add=True, max_length=10, null=True),
        ),
    ]