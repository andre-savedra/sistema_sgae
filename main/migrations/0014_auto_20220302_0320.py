# Generated by Django 3.2.12 on 2022-03-02 06:20

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_auto_20220302_0316'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tarefas',
            old_name='status',
            new_name='idStatusFK',
        ),
        migrations.AlterField(
            model_name='tarefas',
            name='dataInicio',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 2, 6, 20, 6, 950930, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='tarefasstatus',
            name='data',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 3, 2, 6, 20, 6, 951931, tzinfo=utc), null=True),
        ),
    ]
