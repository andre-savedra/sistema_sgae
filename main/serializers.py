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
        if self.user: # and self.user.is_active: 
            return attrs
        self.fail("invalid_credentials")


class CargosSerializer(serializers.ModelSerializer):

    class Meta:        
        model = Cargos
        fields = '__all__'


class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    idNivelAcessoFK = CargosSerializer(read_only=True)

    class Meta:
        many = True
        model = Usuarios
        fields = '__all__'


class UsuariosSerializerSimple(serializers.ModelSerializer):

    class Meta:
        many = True
        model = Usuarios
        fields = '__all__'


class TarefasSerializer(serializers.ModelSerializer):   
    idSolicitanteFK = UsuariosSerializer(read_only=True)
    idAmbienteFK = AmbientesSerializer(read_only=True)

    class Meta:        
        model = Tarefas
        fields = '__all__'


class TarefasSerializerSimple(serializers.ModelSerializer):   
   
    class Meta:        
        model = Tarefas
        fields = '__all__'


class TarefasUsuariosSerializer(serializers.ModelSerializer):
    idUsuarioFK = UsuariosSerializer(read_only=True)
    idTarefaFK = TarefasSerializer(read_only=True)

    class Meta:
        model = TarefasUsuarios
        fields = '__all__'


class TarefasUsuariosSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model = TarefasUsuarios
        fields = '__all__'


class TarefasStatusSerializer(serializers.ModelSerializer):
    idStatusFK = StatusSerializer(read_only=True)
    # idTarefaFK = TarefasSerializer(read_only=True)

    class Meta:
        model = TarefasStatus
        fields = '__all__'


class TarefasStatusSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model = TarefasStatus
        fields = '__all__'


class FotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fotos
        fields = '__all__'

