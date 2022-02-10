from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class detUser(UserAdmin):
    list_display = ('email','username')
    model = User
    # list_display_links = ('id',)
    # search_fields = ('nome',)
    # list_per_page = 10

class detCargos(admin.ModelAdmin):
    list_display = ('id','nome', 'nivelAcesso')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detAmbientes(admin.ModelAdmin):
    list_display = ('id','nome')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detUsuarios(admin.ModelAdmin):
    list_display = ('id','nome', 'email', 'fone', 'ativo', 'nivelAcessoFK')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detTarefas(admin.ModelAdmin):
    list_display = ('id','nome', 'descricao', 'idSolicitanteFK', 'idResponsavelFK', 'idAmbienteFK', 'idStatus', 'prazo', 'dataInicio', 'dataFim')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detFotos(admin.ModelAdmin):
    list_display = ('id','nome', 'idTarefaFK', 'idStatus', 'image')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10


admin.site.register(Cargos, detCargos)
admin.site.register(Ambientes, detAmbientes)
admin.site.register(Usuarios, detUsuarios)
admin.site.register(Tarefas, detTarefas)
admin.site.register(Fotos, detFotos)
admin.site.register(User, detUser)
