# Generated by Django 5.1 on 2024-08-17 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExcelFileSysAdmin',
            fields=[
                ('id_excel', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='excel_files/')),
                ('fecha_subido', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
