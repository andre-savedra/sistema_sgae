
from .models import *
from .serializers import *
import datetime
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from django.http import HttpResponseRedirect

from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.pagination import PageNumberPagination
from djoser.utils import decode_uid
from django.contrib.auth.models import User
from django.core.mail import send_mail

#niveis de acesso
can_deleteUser = 20
can_approveUser = 20


class EmailSenderAPIView(APIView):

 def post(self, request, type):
    
    messageResponse = ''
    if type != None and type != '':
        # NEW TASK
        if type == 'newTask' and request.data:

            payload = request.data

            sendTo = []
            tarefa = Tarefas.objects.get(id=payload[0]['idTarefaFK'])

            for task in payload:
                usuario = Usuarios.objects.get(id=task['idUsuarioFK'])
                if usuario.email != None and usuario.email != '':
                    sendTo.append(usuario.email)
                 

            # sendTo.append('apiza@sp.senai.br')

            messageBody = ('A tarefa de número #' 
            + str(tarefa.id) + ' - ' + str(tarefa.nome) + ', solicitada por '
            + str(tarefa.idSolicitanteFK.nome) + ','
            + ' foi atribuída à você! \n\n Vá até o sistema SGAE - Sistema de Gestão de Ambientes e Localize-a!'
            + '\n\n Acesse nosso sistema em: http://localhost:8003/')
          
            send_mail(
            'SGAE - Uma nova tarefa foi atribuída à você!',
            messageBody,
            None,
            sendTo,
            fail_silently=False,
            )

            messageResponse = 'sent'

        # NEW TASK STATUS
        if type == 'newTaskStatus' and request.data:

            payload = request.data
            print("payload")
            print(payload)

            sendTo = []
            tarefa = Tarefas.objects.get(id=payload[0]['idTarefaFK'])
            status = Status.objects.get(id=payload[0]['idStatusFK'])

            # requester email
            requester = tarefa.idSolicitanteFK.email

            if requester != None and requester != '':
                sendTo.append(tarefa.idSolicitanteFK.email)

            tarefaUsuarios = TarefasUsuarios.objects.filter(idTarefaFK=tarefa.id)
                        
            # employees email
            for taskUser in tarefaUsuarios:
                if taskUser.idUsuarioFK.email != None and taskUser.idUsuarioFK.email != '':
                    if sendTo.count(taskUser.idUsuarioFK.email) == 0:
                        sendTo.append(taskUser.idUsuarioFK.email)            

            # sendTo.append('apiza@sp.senai.br')

            print("Enviando para os emails:")
            print(sendTo)

            messageBody = ('A tarefa de número #' 
            + str(tarefa.id) + ' - ' + str(tarefa.nome) + ', solicitada por '
            + str(tarefa.idSolicitanteFK.nome) + ','
            + ' está em um novo Status: ' + str(status.nome) + '.\n\n Vá até o sistema SGAE - Sistema de Gestão de Ambientes e Localize-a!'
            + '\n\n Acesse nosso sistema em: http://localhost:8003/')
          
            send_mail(
            'SGAE - Novo Status da Tarefa #' + str(tarefa.id),
            messageBody,
            None,
            sendTo,
            fail_silently=False,
            )

            messageResponse = 'sent'

    return Response({"msg": messageResponse})


class RequestActivateUser(APIView):

    def get(self, request, uid, token, format = None):
        userId = decode_uid(uid)
        if userId:
            usuario = Usuarios.objects.get(idUserFK=userId)
            usuario.token = token
            usuario.uid = uid
            usuario.save()
            print("novo usuario:")
            print(usuario)
            return HttpResponseRedirect('http://localhost:3003/sucesso/')
        else:
            return HttpResponseRedirect('http://localhost:3003/erro/')
            

def getPagination(request, listItems):

    if 'page' in request.GET:
        try:
            parameter_page = request.GET['page']
            if (int(parameter_page) <= 0):
                parameter_page = '1'
            page = Paginator(listItems, 10)
            return [page.page(parameter_page), page.count, page.num_pages]
        except (EmptyPage, PageNotAnInteger):
            return [page.page(1), 0, 0]
    else:
        return [listItems, 0, 0]



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
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )
        elif pk != '':
            cargos = Cargos.objects.get(id=pk)
            serializer = CargosSerializer(cargos)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )      
        else:            
            cargos = Cargos.objects.all()
            serializer = CargosSerializer(cargos, many=True)            
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )


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
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )
        else:
            ambientes = Ambientes.objects.get(id=pk)
            serializer = AmbientesSerializer(ambientes)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )


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
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )
        else:
            status = Status.objects.get(id=pk)
            serializer = StatusSerializer(status)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )


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
        print("request usuarios")
        print(request.user)
        
        if 'ativo' in request.GET:
            ativo = request.GET['ativo']
            usuarios = Usuarios.objects.filter(ativo=ativo)
            serializer = UsuariosSerializer(usuarios, many=True)            
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )            
        elif 'token' in request.GET:
            usuarios = Usuarios.objects.exclude(uid__isnull=True)
            serializer = UsuariosSerializer(usuarios, many=True)            
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )            
        elif 'uid' in request.GET:
            usuarios = Usuarios.objects.all()
            resp = getPagination(request, usuarios)
            serializer = UsuariosSerializerUidToken(resp[0], many=True)            
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )  
        elif pk == '':
            usuarios = Usuarios.objects.all()
            resp = getPagination(request, usuarios)
            serializer = UsuariosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        else:
            usuarios = Usuarios.objects.get(idUserFK=pk)
            serializer = UsuariosSerializer(usuarios)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )


    def post(self, request):        
        serializer = UsuariosSerializerSimple(data=request.data, many=True)      
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):

        if 'change' in request.GET:
            usuarios = Usuarios.objects.get(id=pk)
            serializer = UsuariosSerializer(usuarios, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif 'activation' in request.GET:
            # check user level
            message = ""
            if "id" in request.data:
                usuarioRequest = Usuarios.objects.get(id=request.data["id"])
                if usuarioRequest.idNivelAcessoFK.nivelAcesso >= can_deleteUser and usuarioRequest.ativo == True:
                    
                    if "status" in request.data:
                        # approve user
                        if request.data["status"] == True:
                            # get user to allow or deny
                            usuarios = Usuarios.objects.get(id=pk)
                            if usuarios.uid != '' and usuarios.token != '': 

                                djangoHost = request.get_host()
                                payload = {'uid': usuarios.uid, 'token': usuarios.token}
                                
                                url = "http://" + djangoHost +"/api/v1/users/activation/"
                                response = requests.post(url, data = payload)
                                print("url")
                                print(url)
                                print("payload")
                                print(payload)

                                if response.status_code == 204:
                                    message = "approved"

                                    usuarios.ativo = True
                                    usuarios.uid = None
                                    usuarios.token = None
                                    usuarios.save()
                                else:       
                                    message = "error"
                            else:
                                message = "already approved"                                
                                
                        # reprove user
                        else:
                            usuarios = Usuarios.objects.get(id=pk)
                            usuarios.ativo = False
                            usuarios.uid = None
                            usuarios.token = None
                            usuarios.save()
                            
                            user = User.objects.filter(id=usuarios.idUserFK)
                            user.delete()
                            message = "disapproved"
                else:
                    message = "no permission"
            else:
                message = "request unrecognized"               
        
        print(message)            
        return Response({"msg": message})

    def delete(self, request, pk=''):        
              
        return Response({"msg": "Inativo"})


class TarefasAPIView(APIView):
    """
    API tarefas
    """
    # permission_classes = (IsAuthenticated,)
    
    def get(self, request, pk=''):
        
        if 'solicitante' in request.GET:  
            solicitante = request.GET['solicitante']
            tarefas = Tarefas.objects.filter(idSolicitanteFK=solicitante)
            resp = getPagination(request, tarefas)
            serializer = TarefasSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif 'ambiente' in request.GET:
            ambiente = request.GET['ambiente']
            tarefas = Tarefas.objects.filter(idAmbienteFK=ambiente)            
            resp = getPagination(request, tarefas)
            serializer = TarefasSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif 'ids' in request.GET:
            tarefas = Tarefas.objects.all()
            serializer = TarefasSerializerJustId(tarefas, many=True)
            return Response({
                'data': serializer.data,
                'total': 0,
                'pages': 0
            }) 
        elif pk != '':
            tarefas = Tarefas.objects.get(id=pk)            
            serializer = TarefasSerializer(tarefas)            
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )     
        else:
            tarefas = Tarefas.objects.all()
            resp = getPagination(request, tarefas)            
            serializer = TarefasSerializer(resp[0], many=True)
            return Response({
                'data': serializer.data,
                'total': resp[1],
                'pages': resp[2]
            })        
        

    def post(self, request):
        serializer = TarefasSerializerSimple(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()        
        # return Response({"msg": "Inserido com sucesso"})
        # return Response({"id": serializer.data['id']})
        return Response(serializer.data)
        

    def put(self, request, pk=''):
        tarefas = Tarefas.objects.get(id=pk)
        serializer = TarefasSerializerSimple(tarefas, data=request.data)
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

        if 'tarefa' in request.GET:            
            tarefa = request.GET['tarefa']
            tarefasUsuarios = TarefasUsuarios.objects.filter(idTarefaFK=tarefa)
            resp = getPagination(request, tarefasUsuarios)
            serializer = TarefasUsuariosSerializerReduced(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif 'completa' in request.GET:            
            tarefasUsuarios = TarefasUsuarios.objects.all()
            resp = getPagination(request, tarefasUsuarios)
            serializer = TarefasUsuariosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )        
        elif 'tarefaCompletaStatusPhoto' in request.GET:
            tarefa = request.GET['tarefaCompletaStatusPhoto']
            tarefasUsuarios = TarefasUsuarios.objects.filter(idTarefaFK=tarefa)         
            resp = getPagination(request, tarefasUsuarios)
            serializer = TarefasUsuariosSerializer(resp[0], many=True)

            tarefasStatus = TarefasStatus.objects.filter(idTarefaFK=tarefa)
            resp = getPagination(request, tarefasStatus)
            serializerStatus = TarefasStatusSerializer(resp[0], many=True)

            fotos = Fotos.objects.filter(idTarefaFK=tarefa)
            resp = getPagination(request, fotos)
            serializerPhotos = FotosSerializer(resp[0], many=True)

            return Response(
                {
                    'data': serializer.data,
                    'status': serializerStatus.data,
                    'photos': serializerPhotos.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif 'tarefaCompleta' in request.GET:
            tarefa = request.GET['tarefaCompleta']
            tarefasUsuarios = TarefasUsuarios.objects.filter(idTarefaFK=tarefa)         
            resp = getPagination(request, tarefasUsuarios)
            serializer = TarefasUsuariosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,                    
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif 'usuario' in request.GET:            
            usuario = request.GET['usuario']
            tarefasUsuarios = TarefasUsuarios.objects.filter(idUsuarioFK=usuario)
            resp = getPagination(request, tarefasUsuarios)
            serializer = TarefasUsuariosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif pk != '':            
            tarefasUsuarios = TarefasUsuarios.objects.get(id=pk)
            serializer = TarefasUsuariosSerializer(tarefasUsuarios)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )
        else:
            tarefasUsuarios = TarefasUsuarios.objects.all()
            resp = getPagination(request, tarefasUsuarios)
            serializer = TarefasUsuariosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )


    def post(self, request):
        serializer = TarefasUsuariosSerializerSimple(data=request.data,  many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()       
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        tarefasUsuarios = TarefasUsuarios.objects.get(id=pk)
        serializer = TarefasUsuariosSerializerSimple(tarefasUsuarios, data=request.data)
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
        
        if 'tarefa' in request.GET:
            tarefa = request.GET['tarefa']
            tarefasStatus = TarefasStatus.objects.filter(idTarefaFK=tarefa)
            resp = getPagination(request, tarefasStatus)
            serializer = TarefasStatusSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif 'status' in request.GET:
            status = request.GET['status']
            tarefasStatus = TarefasStatus.objects.filter(idStatusFK=status)
            resp = getPagination(request, tarefasStatus)
            serializer = TarefasStatusSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif pk == '':
            tarefasStatus = TarefasStatus.objects.all()
            serializer = TarefasStatusSerializer(tarefasStatus, many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )
        else:
            tarefasStatus = TarefasStatus.objects.get(id=pk)
            resp = getPagination(request, tarefasStatus)
            serializer = TarefasStatusSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )


    def post(self, request):
        serializer = TarefasStatusSerializerSimple(data=request.data, many=True)
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
        if 'tarefa' in request.GET:   
            tarefa = request.GET['tarefa']
            fotos = Fotos.objects.filter(idTarefaFK=tarefa)
            resp = getPagination(request, fotos)
            serializer = FotosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )
        elif pk != '':
            fotos = Fotos.objects.get(id=pk)
            serializer = FotosSerializer(fotos)
            return Response(
                {
                    'data': serializer.data,
                    'total': 0,
                    'pages': 0
                }
            )
        else:
            fotos = Fotos.objects.all()
            resp = getPagination(request, fotos)
            serializer = FotosSerializer(resp[0], many=True)
            return Response(
                {
                    'data': serializer.data,
                    'total': resp[1],
                    'pages': resp[2]
                }
            )


    def post(self, request):
        serializer = FotosSerializer(data=request.data)
        # print(request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        # return Response({"msg": "Inserido com sucesso"})
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


