# Generated by Django 5.1 on 2024-08-12 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_alter_cuota_monto'),
    ]

    operations = [
        migrations.RenameField(
            model_name='compromisodepago',
            old_name='monto',
            new_name='cuota_reducida',
        ),
        migrations.AddField(
            model_name='compromisodepago',
            name='cuota_reducida_2venc',
            field=models.FloatField(default=1.1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='compromisodepago',
            name='cuota_reducida_3venc',
            field=models.FloatField(default=1.1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='compromisodepago',
            name='matricula',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='compromisodepago',
            name='monto_completo',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='compromisodepago',
            name='monto_completo_2venc',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='compromisodepago',
            name='monto_completo_3venc',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]