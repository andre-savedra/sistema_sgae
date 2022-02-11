from django.shortcuts import render
from .models import *
from .serializers import *
import datetime
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from django.http import HttpResponseRedirect


class ActivateUser(APIView):

    def get(self, request, uid, token, format = None):
        payload = {'uid': uid, 'token': token}

        url = "http://localhost:8000/api/v1/users/activation/"
        response = requests.post(url, data = payload)
        # print("response")
        # print(response)
        # print(response.status_code)

        if response.status_code == 204:
            return HttpResponseRedirect('http://localhost:3000/success/')            
        else:       
            return HttpResponseRedirect('http://localhost:3000/error/')
            

class CargosAPIView(APIView):
    """
    API Cargos
    """

    def get(self, request, pk=''):
        if pk == '':
            cargos = Cargos.objects.all()
            serializer = CargosSerializer(cargos, many=True)
            return Response(serializer.data)
        else:
            cargos = Cargos.objects.get(id=pk)
            serializer = CargosSerializer(cargos)
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


class UsuariosAPIView(APIView):
    """
    API Usuarios
    """

    def get(self, request, pk=''):
        if pk == '':
            usuarios = Usuarios.objects.all()
            serializer = UsuariosSerializer(usuarios, many=True)
            return Response(serializer.data)
        else:
            usuarios = Usuarios.objects.get(id=pk)
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

    def get(self, request, pk=''):
        if pk == '':
            tarefas = Tarefas.objects.all()
            serializer = TarefasSerializer(tarefas, many=True)
            return Response(serializer.data)
        else:
            tarefas = Tarefas.objects.get(id=pk)
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


class FotosAPIView(APIView):
    """
    API Fotos
    """

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