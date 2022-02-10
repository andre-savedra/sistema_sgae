from rest_framework import serializers
from .models import *

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = [
#             'id',
#             'username',            
#             'email',
#             'fone',
#             'ativo',
#             'nivelAcessoFK',
#         ]


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
            'nivelAcessoFK',
        ]


class TarefasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefas
        fields = [
            'id',
            'nome',
            'descricao',
            'idSolicitanteFK',
            'idResponsavelFK',
            'idAmbienteFK',
            'idStatus',
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
            'idStatus',
            'image',
        ]

