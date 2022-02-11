# import os
# import django
# import datetime
# import pandas as pd
from django.db import models
from django.utils import timezone

from django.contrib.auth.models import User
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False

class Cargos(models.Model):
    nome = models.CharField(max_length=50)
    nivelAcesso = models.IntegerField(default=0)

    def __str__(self):
        return self.nome


class Ambientes(models.Model):
    nome = models.CharField(max_length=80)

    def __str__(self):
        return self.nome


class Usuarios(models.Model):
    nome = models.CharField(max_length=55)
    idUserFK = models.BigIntegerField()
    email = models.CharField(max_length=80)
    fone = models.CharField(max_length=15)
    ativo = models.BooleanField(default=False)
    nivelAcessoFK = models.ForeignKey(Cargos, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome


def upload_image_task(instance, filename):
    return f"{instance.idTarefaFK}-{instance.idStatus}-{filename}"


class Tarefas(models.Model):
    nome = models.CharField(max_length=80)
    descricao = models.CharField(max_length=500)
    idSolicitanteFK = models.ForeignKey(Usuarios, related_name="idSolicitanteFK", on_delete=models.CASCADE)    
    idResponsavelFK = models.ForeignKey(Usuarios, related_name="idResponsavelFK", on_delete=models.CASCADE)    
    idAmbienteFK = models.ForeignKey(Ambientes, on_delete=models.CASCADE)    
    idStatus = models.CharField(max_length=15, 
                choices=(('1','Iniciada'),
                         ('2','Em Análise'),
                         ('3','Em Andamento'),
                         ('4','Finalizada')))
    prazo = models.DateTimeField()
    dataInicio = models.DateTimeField(default=timezone.now())
    dataFim = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.nome


class Fotos(models.Model):
    nome = models.CharField(max_length=55)
    idTarefaFK = models.ForeignKey(Tarefas, on_delete=models.CASCADE)    
    idStatus = models.CharField(max_length=15, 
                choices=(('1','Iniciada'),
                         ('2','Em Análise'),
                         ('3','Em Andamento'),
                         ('4','Finalizada')))
    image = models.ImageField(upload_to=upload_image_task, blank=True, null=True)
    
    def __str__(self):
        return self.nome