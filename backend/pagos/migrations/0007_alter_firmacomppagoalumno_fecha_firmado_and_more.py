# Generated by Django 5.1 on 2024-08-30 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pagos', '0006_alter_compromisodepago_fecha_ultima_modif'),
    ]

    operations = [
        migrations.AlterField(
            model_name='firmacomppagoalumno',
            name='fecha_firmado',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='firmacomppagoalumno',
            name='firmado',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]
