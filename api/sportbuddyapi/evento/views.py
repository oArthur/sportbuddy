from django.http import HttpResponse
from usuario.models import Notificacao
from preferencia.models import Preferencia
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import *


# Como usar os endpoints:
# Path padrão para os endpoints - hostname/evento/api - Ex: http://localhost:8000/evento/api
# Criar Evento: Enviar com método POST um json com os campos requeridos, modelo abaixo:
#     {
#       "nome": "Nome do evento",
#       "data_inicio": "2023-11-13T12:00:00Z",
#       "data_fim": "2023-11-14T18:00:00Z",
#       "local_evento": "Local do evento",
#       "id_participantes": [1, 2],
#       "esporte": 1
#     }
# Ler/Retornar Evento: Enviar método GET com o id do usuário no prório link da request:
#     http://localhost:8000/evento/api/1
#
# Atualizar Evento: Enviar método PUT com o id do Evento no header da request e um json no corpo
# da request, JSON do mesmo modelo do Criar Evento
#
# Deletar Evento: Enviar método DELETE com o id do Evento no header da request.

class CreateEvento(generics.CreateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def perform_create(self, serializer, *args, **kwargs):
        return serializer.save()


class QueryEvento(generics.RetrieveUpdateDestroyAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def get_object(self):
        obj = get_object_or_404(Evento, pk=self.kwargs['pk'])
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except:
            return Response({"error": "ID não encontrado/inválido"}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Evento deletado com sucesso"}, status=status.HTTP_204_NO_CONTENT)


class ListAllEventos(generics.ListAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def get(self, request, *args, **kwargs):
        try:
            user = Usuario.objects.get(id=self.kwargs['pk'])
            preferencias = Preferencia.objects.filter(usuario_preferencia=user)

            eventos = Evento.objects.filter(esporte__in=preferencias.values_list('esporte_preferencia', flat=True))
            response = [
                {
                    "id": evento.id,
                    "esporte": evento.esporte.all()[0].nome if evento.esporte.all() else None,
                    "inscrito": True if user in evento.id_participantes.all() else False,
                }
                for evento in eventos
            ]

            return  Response(response, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": "ID não encontrado/inválido"}, status=status.HTTP_404_NOT_FOUND)


class ManageEvento(generics.GenericAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def get(self, request, *args, **kwargs):
        try:
            evento = Evento.objects.get(id=self.kwargs['pk'])
            usuario = Usuario.objects.get(pk=self.kwargs['id_usuario'])

            if 'join' in request.path:
                evento.id_participantes.add(usuario)
                evento.save()

                notificacao = Notificacao(
                    usuario=usuario,
                    tipo='evento',
                    evento_relacionado=evento,
                    usuario_relacionado=evento.criador,
                    description=f'Você foi adicionado ao evento de {evento.esporte.all()[0].nome} em {evento.local_evento}',
                    title='Eventos',
                )
                notificacao.save()
                print(notificacao)

                notificacao_criador = Notificacao(
                    usuario=evento.criador,
                    tipo='evento',
                    evento_relacionado=evento,
                    usuario_relacionado=usuario,
                    description=f'O usuário {usuario.first_name} {usuario.last_name} foi adicionado ao evento de {evento.esporte.all()[0].nome} em {evento.local_evento}',
                    title='Eventos',
                )
                notificacao_criador.save()
                print(notificacao_criador)

                return Response({"message": "Usuário adicionado com sucesso"}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"error": "ID não encontrado/inválido"}, status=status.HTTP_404_NOT_FOUND)


def index(request):
    return HttpResponse("Endpoint Evento conectado com sucesso, utilizar os endpoints para acessar os métodos")