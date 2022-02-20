from django.shortcuts import render
from .models import *
from .serializers import *
import datetime
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from django.http import HttpResponseRedirect

from rest_framework.permissions import IsAuthenticated

class ActivateUser(APIView):

    def get(self, request, uid, token, format = None):
        payload = {'uid': uid, 'token': token}

        url = "http://localhost:8000/api/v1/users/activation/"
        response = requests.post(url, data = payload)

        if response.status_code == 204:
            return HttpResponseRedirect('http://localhost:3000/success/')            
        else:       
            return HttpResponseRedirect('http://localhost:3000/error/')
            

class CargosAPIView(APIView):
    """
    API Cargos
    """
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if 'nivel' in request.GET:            
            nivel = request.GET['nivel']
            cargos = Cargos.objects.filter(nivelAcesso=nivel)
            serializer = CargosSerializer(cargos, many=True)            
            return Response(serializer.data)
        elif pk != '':
            cargos = Cargos.objects.get(id=pk)
            serializer = CargosSerializer(cargos)
            return Response(serializer.data)        
        else:            
            cargos = Cargos.objects.all()
            serializer = CargosSerializer(cargos, many=True)            
            return Response(serializer.data)


    def post(self, request):
        serializer = CargosSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        cargos = Cargos.objects.get(id=pk)
        serializer = CargosSerializer(cargos, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        cargos = Cargos.objects.get(id=pk)
        cargos.delete()
        return Response({"msg": "Apagado com sucesso"})



class AmbientesAPIView(APIView):
    """
    API Ambientes
    """
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if pk == '':
            ambientes = Ambientes.objects.all()
            serializer = AmbientesSerializer(ambientes, many=True)
            return Response(serializer.data)
        else:
            ambientes = Ambientes.objects.get(id=pk)
            serializer = AmbientesSerializer(ambientes)
            return Response(serializer.data)


    def post(self, request):
        serializer = AmbientesSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        ambientes = Ambientes.objects.get(id=pk)
        serializer = AmbientesSerializer(ambientes, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        ambientes = Ambientes.objects.get(id=pk)
        ambientes.delete()
        return Response({"msg": "Apagado com sucesso"})


class StatusAPIView(APIView):
    """
    API Status
    """
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if pk == '':
            status = Status.objects.all()
            serializer = StatusSerializer(status, many=True)
            return Response(serializer.data)
        else:
            status = Status.objects.get(id=pk)
            serializer = StatusSerializer(status)
            return Response(serializer.data)


    def post(self, request):
        serializer = StatusSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        status = Status.objects.get(id=pk)
        serializer = StatusSerializer(status, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        status = Status.objects.get(id=pk)
        status.delete()
        return Response({"msg": "Apagado com sucesso"})



class UsuariosAPIView(APIView):
    """
    API Usuarios
    """

    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if pk == '':
            usuarios = Usuarios.objects.all()
            serializer = UsuariosSerializer(usuarios, many=True)
            return Response(serializer.data)
        else:
            usuarios = Usuarios.objects.get(idUserFK=pk)
            serializer = UsuariosSerializer(usuarios)
            return Response(serializer.data)


    def post(self, request):
        serializer = UsuariosSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        usuarios = Usuarios.objects.get(id=pk)
        serializer = UsuariosSerializer(usuarios, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        usuarios = Usuarios.objects.get(id=pk)
        usuarios.delete()
        return Response({"msg": "Apagado com sucesso"})


class TarefasAPIView(APIView):
    """
    API tarefas
    """

    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if 'solicitante' in request.GET:            
            solicitante = request.GET['solicitante']
            tarefas = Tarefas.objects.filter(idSolicitanteFK=solicitante)
            serializer = TarefasSerializer(tarefas, many=True)            
            return Response(serializer.data)
        elif 'ambiente' in request.GET:
            ambiente = request.GET['ambiente']
            tarefas = Tarefas.objects.filter(idAmbienteFK=ambiente)
            serializer = TarefasSerializer(tarefas, many=True)            
            return Response(serializer.data)
        elif pk != '':
            tarefas = Tarefas.objects.get(id=pk)            
            serializer = TarefasSerializer(tarefas, many=True)            
            return Response(serializer.data)        
        else:
            tarefas = Tarefas.objects.all()
            serializer = TarefasSerializer(tarefas)            
            return Response(serializer.data)
        

    def post(self, request):
        serializer = TarefasSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        tarefas = Tarefas.objects.get(id=pk)
        serializer = TarefasSerializer(tarefas, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        tarefas = Tarefas.objects.get(id=pk)
        tarefas.delete()
        return Response({"msg": "Apagado com sucesso"})


class TarefasUsuariosAPIView(APIView):
    """
    API tarefas
    """

    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if pk == '':
            tarefasUsuarios = TarefasUsuarios.objects.all()
            serializer = TarefasUsuariosSerializer(tarefasUsuarios, many=True)
            return Response(serializer.data)
        else:
            tarefasUsuarios = TarefasUsuarios.objects.get(id=pk)
            serializer = TarefasUsuariosSerializer(tarefasUsuarios)
            return Response(serializer.data)


    def post(self, request):
        serializer = TarefasUsuariosSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        tarefasUsuarios = TarefasUsuarios.objects.get(id=pk)
        serializer = TarefasUsuariosSerializer(tarefasUsuarios, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        tarefasUsuarios = TarefasUsuarios.objects.get(id=pk)
        tarefasUsuarios.delete()
        return Response({"msg": "Apagado com sucesso"})


class TarefasStatusAPIView(APIView):
    """
    API tarefasStatus
    """
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if pk == '':
            tarefasStatus = TarefasStatus.objects.all()
            serializer = TarefasStatusSerializer(tarefasStatus, many=True)
            return Response(serializer.data)
        else:
            tarefasStatus = TarefasStatus.objects.get(id=pk)
            serializer = TarefasStatusSerializer(tarefasStatus)
            return Response(serializer.data)


    def post(self, request):
        serializer = TarefasStatusSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        tarefasStatus = TarefasStatus.objects.get(id=pk)
        serializer = TarefasStatusSerializer(tarefasStatus, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        tarefasStatus = TarefasStatus.objects.get(id=pk)
        tarefasStatus.delete()
        return Response({"msg": "Apagado com sucesso"})





class FotosAPIView(APIView):
    """
    API Fotos
    """

    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=''):
        if pk == '':
            fotos = Fotos.objects.all()
            serializer = FotosSerializer(fotos, many=True)
            return Response(serializer.data)
        else:
            fotos = Fotos.objects.get(id=pk)
            serializer = FotosSerializer(fotos)
            return Response(serializer.data)


    def post(self, request):
        serializer = FotosSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        fotos = Fotos.objects.get(id=pk)
        serializer = FotosSerializer(fotos, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        fotos = Fotos.objects.get(id=pk)
        fotos.delete()
        return Response({"msg": "Apagado com sucesso"})