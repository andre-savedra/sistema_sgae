# Generated by Django 3.2.12 on 2022-03-02 08:01

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_auto_20220302_0341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarefas',
            name='dataInicio',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 2, 8, 1, 47, 75771, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='tarefasstatus',
            name='data',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 3, 2, 8, 1, 47, 76771, tzinfo=utc), null=True),
        ),
    ]
