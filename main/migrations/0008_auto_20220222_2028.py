# Generated by Django 3.2.12 on 2022-02-22 23:28

import datetime
from django.db import migrations, models
from django.utils.timezone import utc
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20220222_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fotos',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to=main.models.upload_image_task),
        ),
        migrations.AlterField(
            model_name='tarefas',
            name='dataInicio',
            field=models.DateTimeField(default=datetime.datetime(2022, 2, 22, 23, 28, 10, 207110, tzinfo=utc)),
        ),
    ]