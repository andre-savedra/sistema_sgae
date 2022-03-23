# Generated by Django 3.2.12 on 2022-03-23 18:20

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_auto_20220323_1225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarefas',
            name='dataInicio',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 18, 20, 4, 216579, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='tarefasstatus',
            name='data',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 3, 23, 18, 20, 4, 217579, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='token',
            field=models.CharField(blank=True, default='', max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='uid',
            field=models.CharField(blank=True, default='', max_length=55, null=True),
        ),
    ]
