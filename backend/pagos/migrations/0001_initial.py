# Generated by Django 5.1 on 2024-08-18 00:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('alumnos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompromisoDePago',
            fields=[
                ('id_comp_pago', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_compr', models.DateField(blank=True, null=True)),
                ('cuatrimestre', models.CharField(blank=True, max_length=255, null=True)),
                ('monto_completo', models.FloatField(blank=True, null=True)),
                ('monto_completo_2venc', models.FloatField(blank=True, null=True)),
                ('monto_completo_3venc', models.FloatField(blank=True, null=True)),
                ('matricula', models.FloatField(blank=True, null=True)),
                ('cuota_reducida', models.FloatField(blank=True, null=True)),
                ('cuota_reducida_2venc', models.FloatField(blank=True, null=True)),
                ('cuota_reducida_3venc', models.FloatField(blank=True, null=True)),
                ('comprimiso_path', models.CharField(blank=True, max_length=255, null=True)),
                ('archivo_pdf', models.FileField(blank=True, null=True, upload_to='compromisos/')),
                ('fecha_carga_comp_pdf', models.DateTimeField(auto_now_add=True, null=True)),
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
        migrations.CreateModel(
            name='FirmaCompPagoAlumno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_firmado', models.DateTimeField()),
                ('firmado', models.BooleanField()),
                ('alumno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='alumnos.alumno')),
                ('compromiso_de_pago', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pagos.compromisodepago')),
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
                ('alumno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='alumnos.alumno')),
                ('cuota', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pagos.cuota')),
            ],
        ),
        migrations.CreateModel(
            name='LineaDePago',
            fields=[
                ('id_linea_pago', models.AutoField(primary_key=True, serialize=False)),
                ('monto_aplicado', models.FloatField()),
                ('cuota', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pagos.cuota')),
                ('pago', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pagos.pago')),
            ],
        ),
    ]
