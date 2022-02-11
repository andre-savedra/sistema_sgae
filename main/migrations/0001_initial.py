# Generated by Django 3.2.12 on 2022-02-10 19:20

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc
import main.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ambientes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='Cargos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('nivelAcesso', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=55)),
                ('idUserFK', models.BigIntegerField()),
                ('email', models.CharField(max_length=80)),
                ('fone', models.CharField(max_length=15)),
                ('ativo', models.BooleanField(default=False)),
                ('nivelAcessoFK', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.cargos')),
            ],
        ),
        migrations.CreateModel(
            name='Tarefas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=80)),
                ('descricao', models.CharField(max_length=500)),
                ('idStatus', models.CharField(choices=[('1', 'Iniciada'), ('2', 'Em Análise'), ('3', 'Em Andamento'), ('4', 'Finalizada')], max_length=15)),
                ('prazo', models.DateTimeField()),
                ('dataInicio', models.DateTimeField(default=datetime.datetime(2022, 2, 10, 19, 20, 37, 99239, tzinfo=utc))),
                ('dataFim', models.DateTimeField(blank=True, null=True)),
                ('idAmbienteFK', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.ambientes')),
                ('idResponsavelFK', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='idResponsavelFK', to='main.usuarios')),
                ('idSolicitanteFK', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='idSolicitanteFK', to='main.usuarios')),
            ],
        ),
        migrations.CreateModel(
            name='Fotos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=55)),
                ('idStatus', models.CharField(choices=[('1', 'Iniciada'), ('2', 'Em Análise'), ('3', 'Em Andamento'), ('4', 'Finalizada')], max_length=15)),
                ('image', models.ImageField(blank=True, null=True, upload_to=main.models.upload_image_task)),
                ('idTarefaFK', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.tarefas')),
            ],
        ),
    ]
