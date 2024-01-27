from django.http import HttpResponse
from preferencia.models import Preferencia
from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from django.shortcuts import get_object_or_404
from .models import *
from django.db.models import Q



# Como usar os endpoints:
# Path padrão para os endpoints - hostname/usuario/api - Ex: http://localhost:8000/usuario/api
# Criar usuário: Enviar com método POST um json com os campos requeridos, modelo abaixo:
#     {
#       "password": "Senha@123",
#       "username": "charles.alicate",
#       "first_name": "Chales",
#       "last_name": "Alicate",
#       "email": "charles.alicate@email.com",
#       "cpf": "12345678901",
#       "telefone": "12345678901",
#       "aceitou_termo": true,
#       "pontuacao": 0
#   }
# Ler/Retornar Usuário: Enviar método GET com o id do usuário no prório link da request:
#     http://localhost:8000/usuario/api/1
#
# Atualizar Usuário: Enviar método PUT com o id do usuário no header da request e um json no corpo
# da request, JSON do mesmo modelo do Criar Usuário
#
# Deletar Usuário: Enviar método DELETE com o id do usuário no header da request.


class CreateUsuario(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = Usuario_Serializer


class QueryUsuario(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = Usuario_Serializer_Profile_Show

    def get_object(self):
        obj = get_object_or_404(Usuario, pk=self.kwargs['pk'])
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            print(e)
            return Response({"error": "ID não encontrado/inválido"}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        # Deleta as amizades do usuário, preferências e notificações
        Amizade.objects.filter(usuario=instance).delete()
        Amizade.objects.filter(amigo=instance).delete()
        Preferencia.objects.filter(usuario_preferencia=instance).delete()
        Notificacao.objects.filter(usuario=instance).delete()
        
        return Response({"message": "Usuário deletado com sucesso"}, status=status.HTTP_204_NO_CONTENT)


class Login(generics.GenericAPIView):
    queryset = Usuario.objects.all()
    serializer_class = Usuario_Serializer_Login

    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            user = Usuario.objects.get(email=request.data['email'])
            if user.password == request.data['password']:
                return Response({"id": user.pk}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Senha incorreta"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)


class NotificacaoViewSet(viewsets.ModelViewSet):
    queryset = Notificacao.objects.all()
    serializer_class = NotificacaoSerializer

    @action(detail=True, methods=['get'])
    def get_queryset(self, *args, **kwargs):
        queryset = Notificacao.objects.all().order_by('-date')
        user = self.kwargs['usuario']

        if user is not None:
            queryset = queryset.filter(usuario=user)
        
        serializer = NotificacaoSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class FriendshipViews(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = Usuario_Serializer_Profile_Show

    @action(detail=True, methods=['get'])
    def get(self, request, *args, **kwargs):
        try:
            user = Usuario.objects.get(pk=self.kwargs['pk'])
            preferences = Preferencia.objects.get(usuario_preferencia=user)
            ignorados = Ignorar.objects.filter(usuario=user).values_list('ignorado', flat=True)

            sugestoes = Usuario.objects.filter(preferencia__esporte_preferencia__in=preferences.esporte_preferencia.all()).exclude(pk=user.pk).exclude(amigo__usuario=user.pk).exclude(usuario__amigo=user.pk).exclude(pk__in=ignorados).exclude(
                pk__in=Amizade.objects.filter(usuario=user).values_list('amigo', flat=True)).exclude(pk__in=Amizade.objects.filter(amigo=user).values_list('usuario', flat=True))

            serializer = Usuario_Serializer_Profile_Show(sugestoes, many=True)
            
            return Response(serializer.data[0], status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def post(self, request, *args, **kwargs):
        try:
            user = Usuario.objects.get(pk=self.kwargs['pk'])
            friend = Usuario.objects.get(pk=request.data['friend_id'])
            operacao = request.data['operation']

            print({
                "user": user,
                "friend": friend,
                "operacao": operacao
            })

            if operacao == 'add':
                amizade = Amizade(usuario=user, amigo=friend)
                amizade.save()

                notificacao_amigo = Notificacao(
                    usuario=friend,
                    tipo='friend_req',
                    usuario_relacionado=user,
                    description=f'{user.first_name} {user.last_name} te enviou uma solicitação de amizade',
                    title='Solicitação de amizade',
                )
                notificacao_amigo.save()

                notificacao_soliciante = Notificacao(
                    usuario=user,
                    tipo='req_update',
                    usuario_relacionado=friend,
                    description=f'Solicitação de amizade enviada para {friend.first_name} {friend.last_name}',
                    title='Solicitação de amizade',
                )
                notificacao_soliciante.save()

                return Response({"message": "Solicitação de amizade enviada com sucesso"}, status=status.HTTP_201_CREATED)
        
            elif operacao == 'reject':
                amizade = Amizade.objects.get(usuario=friend, amigo=user)                
                notificacao_solicitacao = Notificacao.objects.filter(usuario=user, usuario_relacionado=friend, tipo='friend_req').order_by('-date')[0]
                amizade.recusado = True
                notificacao_solicitacao.description = f"Você recusou a solicitação de amizade de {friend.first_name} {friend.last_name}"
                amizade.save()

                notificacao_solicitacao.lida = True
                notificacao_solicitacao.tipo = 'req_update'
                notificacao_solicitacao.save()

                return Response({"message": "Solicitação de amizade rejeitada com sucesso"}, status=status.HTTP_200_OK)

            elif operacao == 'ignore':
                ignorar = Ignorar(usuario=user, ignorado=friend)
                ignorar.save()
                return Response({"message": "Usuário ignorado com sucesso"}, status=status.HTTP_200_OK)

            elif operacao == 'accept':
                amizade = Amizade.objects.get(usuario=friend, amigo=user)
                amizade.aceito = True
                amizade.save()

                notificacao_solicitacao = Notificacao.objects.filter(usuario=user, usuario_relacionado=friend, tipo='friend_req').order_by('-date')[0]
                notificacao_solicitacao.lida = True
                notificacao_solicitacao.tipo = 'req_update'
                notificacao_solicitacao.description = f"Você e {friend.first_name} {friend.last_name} agora são amigos!"
                notificacao_solicitacao.save()

                notificacao_amigo = Notificacao(
                    usuario=friend,
                    tipo='req_update',
                    usuario_relacionado=user,
                    description=f'{user.first_name} {user.last_name} aceitou sua solicitação de amizade',
                    title='Solicitação de amizade aceita',
                )
                notificacao_amigo.save()

                return Response({"message": "Solicitação de amizade aceita com sucesso"}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def get_all(self, request, *args, **kwargs):
        try:
            user = Usuario.objects.get(pk=self.kwargs['pk'])
            amigos_adicionados_pelo_usuario = Amizade.objects.filter(
                Q(usuario=user, aceito=True)
            ).values_list('usuario', 'amigo').values_list('amigo', flat=True)
            amigos_adicionados_pelo_amigo = Amizade.objects.filter(
                Q(amigo=user, aceito=True)
            ).values_list('usuario', 'amigo').values_list('usuario', flat=True)
            amigos = Usuario.objects.filter(pk__in=amigos_adicionados_pelo_usuario) | Usuario.objects.filter(pk__in=amigos_adicionados_pelo_amigo)
            serializer = Usuario_Serializer_Profile_Show(amigos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

def index(request):
    return HttpResponse("Endpoint usuário conectado com sucesso, utilizar os endpoints para acessar os métodos")
