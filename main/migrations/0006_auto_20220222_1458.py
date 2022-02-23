# Generated by Django 3.2.12 on 2022-02-22 17:58

import datetime
from django.db import migrations, models
from django.utils.timezone import utc
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20220222_1451'),
    ]

    operations = [
        migrations.CreateModel(
            name='FotoTeste',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to=main.models.upload_image_task)),
            ],
        ),
        migrations.AlterField(
            model_name='tarefas',
            name='dataInicio',
            field=models.DateTimeField(default=datetime.datetime(2022, 2, 22, 17, 58, 6, 826137, tzinfo=utc)),
        ),
    ]