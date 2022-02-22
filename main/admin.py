from django.contrib import admin
from .models import *

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

class detStatus(admin.ModelAdmin):
    list_display = ('id','nome')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detUsuarios(admin.ModelAdmin):
    list_display = ('id','nome', 'email', 'fone', 'ativo', 'idNivelAcessoFK')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detTarefas(admin.ModelAdmin):
    list_display = ('id','nome', 'descricao', 'idSolicitanteFK', 'idAmbienteFK', 'prazo', 'dataInicio', 'dataFim')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detTarefasUsuarios(admin.ModelAdmin):
    list_display = ('id','idUsuarioFK', 'idTarefaFK')
    list_display_links = ('id',)
    search_fields = ('idTarefaFK',)
    list_per_page = 10

class detTarefasStatus(admin.ModelAdmin):
    list_display = ('id','idStatusFK', 'idTarefaFK', 'data')
    list_display_links = ('id',)
    search_fields = ('idTarefaFK',)
    list_per_page = 10

class detFotos(admin.ModelAdmin):
    list_display = ('id','nome', 'idTarefaFK', 'idStatusFK', 'image')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10


admin.site.register(Cargos, detCargos)
admin.site.register(Ambientes, detAmbientes)
admin.site.register(Status, detStatus)
admin.site.register(Usuarios, detUsuarios)
admin.site.register(Tarefas, detTarefas)
admin.site.register(TarefasUsuarios, detTarefasUsuarios)
admin.site.register(TarefasStatus, detTarefasStatus)
admin.site.register(Fotos, detFotos)
