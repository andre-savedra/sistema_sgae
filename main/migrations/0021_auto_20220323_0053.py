# Generated by Django 3.2.12 on 2022-03-23 03:53

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_auto_20220307_0902'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarefas',
            name='dataInicio',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 3, 53, 8, 240335, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='tarefasstatus',
            name='data',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 3, 23, 3, 53, 8, 242335, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='idUserFK',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]