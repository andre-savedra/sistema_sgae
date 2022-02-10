from django.urls import path
from .views import *

urlpatterns = [
    path("cargos/", CargosAPIView.as_view(), name='cargos'),
    path('cargos/<int:pk>/', CargosAPIView.as_view(), name='cargosParameters'),

    path("ambientes/", AmbientesAPIView.as_view(), name='ambientes'),
    path('ambientes/<int:pk>/', AmbientesAPIView.as_view(), name='ambientesParameters'),

    path("usuarios/", UsuariosAPIView.as_view(), name='usuarios'),
    path('usuarios/<int:pk>/', UsuariosAPIView.as_view(), name='usuariosParameters'),

    path("tarefas/", TarefasAPIView.as_view(), name='tarefas'),
    path('tarefas/<int:pk>/', TarefasAPIView.as_view(), name='tarefasParameters'),

    path("fotos/", FotosAPIView.as_view(), name='fotos'),
    path('fotos/<int:pk>/', FotosAPIView.as_view(), name='fotosParameters'),
]
