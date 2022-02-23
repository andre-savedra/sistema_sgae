from rest_framework import serializers
from .models import *

from django.contrib.auth import authenticate, get_user_model
from djoser.conf import settings
from djoser.serializers import TokenCreateSerializer

User = get_user_model()

class CustomTokenCreateSerializer(TokenCreateSerializer):

    def validate(self, attrs):
        password = attrs.get("password")
        params = {settings.LOGIN_FIELD: attrs.get(settings.LOGIN_FIELD)}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                self.fail("invalid_credentials")
        # We changed only below line
        if self.user: # and self.user.is_active: 
            return attrs
        self.fail("invalid_credentials")


class CargosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargos
        fields = [
            'id',            
            'nome',            
            'nivelAcesso',            
        ]


class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        fields = [
            'id',            
            'nome',            
        ]


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = [
            'id',
            'nome',            
        ]


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [
            'id',
            'nome',
            'idUserFK',
            'email',
            'fone',
            'ativo',
            'idNivelAcessoFK',
            'image'
        ]

class TarefasUsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarefasUsuarios
        fields = [
            'id',            
            'idUserFK',
            'idTarefaFK'
        ]

class TarefasStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarefasStatus
        fields = [
            'id',
            'idTarefaFK',
            'idStatusFK',
            'data',
        ]

class TarefasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefas
        fields = [
            'id',
            'nome',
            'descricao',
            'idSolicitanteFK',            
            'idAmbienteFK',
            'prazo',
            'dataInicio',
            'dataFim',
        ]


class FotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fotos
        fields = [
            'id',
            'nome',
            'idTarefaFK',
            'idStatusFK',
            'image',
        ]

