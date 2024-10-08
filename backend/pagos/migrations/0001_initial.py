# Generated by Django 5.1 on 2024-09-02 09:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompromisoDePago',
            fields=[
                ('id_comp_pago', models.AutoField(primary_key=True, serialize=False)),
                ('cuatrimestre', models.CharField(blank=True, max_length=255, null=True)),
                ('anio', models.DateTimeField(blank=True, max_length=10, null=True)),
                ('monto_completo', models.FloatField(blank=True, null=True)),
                ('monto_completo_2venc', models.FloatField(blank=True, null=True)),
                ('monto_completo_3venc', models.FloatField(blank=True, null=True)),
                ('matricula', models.FloatField(blank=True, null=True)),
                ('cuota_reducida', models.FloatField(blank=True, null=True)),
                ('cuota_reducida_2venc', models.FloatField(blank=True, null=True)),
                ('cuota_reducida_3venc', models.FloatField(blank=True, null=True)),
                ('comprimiso_path', models.CharField(blank=True, max_length=255, null=True)),
                ('archivo_pdf', models.FileField(blank=True, null=True, upload_to='compromisos/')),
                ('fecha_ultima_modif', models.DateTimeField(blank=True, max_length=10, null=True)),
                ('fecha_carga_comp_pdf', models.DateTimeField(auto_now_add=True, max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FirmaCompPagoAlumno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_firmado', models.DateTimeField(auto_now_add=True, null=True)),
                ('firmado', models.BooleanField(blank=True, default=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='LineaDePago',
            fields=[
                ('id_linea_pago', models.AutoField(primary_key=True, serialize=False)),
                ('monto_aplicado', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id_pago', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.TextField()),
                ('medio_pago', models.CharField(max_length=255)),
                ('nro_recibo', models.IntegerField()),
                ('monto', models.FloatField()),
                ('estado', models.BooleanField()),
                ('fecha', models.DateField()),
                ('comprobante', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Cuota',
            fields=[
                ('id_cuota', models.AutoField(primary_key=True, serialize=False)),
                ('nro_cuota', models.IntegerField()),
                ('recargo', models.FloatField()),
                ('estado', models.CharField(max_length=255)),
                ('vencimiento', models.DateField()),
                ('fecha_pago', models.DateField()),
                ('fecha_vencimiento', models.DateField()),
                ('fecha_pago_devengado', models.DateField()),
                ('fecha_pedido', models.DateField()),
                ('tipo_puesto', models.CharField(max_length=255)),
                ('compdepago', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pagos.compromisodepago')),
            ],
        ),
    ]
