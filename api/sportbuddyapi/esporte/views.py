from django.http import HttpResponse
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import *


# Como usar os endpoints:
# Path padrão para os endpoints - hostname/esporte/api - Ex: http://localhost:8000/esporte/api
# Criar Esporte: Enviar com método POST um json com os campos requeridos, modelo abaixo:
#     {
#         "nome": "Futebol",
#         "descricao": "jogar bola uai",
#         "forma_pratica": 1,
#     }
# PS: forma_pratica: 0 - Individual | 1 - Em equipe
# Ler/Retornar Esporte: Enviar método GET com o id do usuário no prório link da request:
#     http://localhost:8000/esporte/api/1
#
# Atualizar Esporte: Enviar método PUT com o id do Esporte no header da request e um json no corpo
# da request, JSON do mesmo modelo do Criar Esporte
#
# Deletar Esporte: Enviar método DELETE com o id do Esporte no header da request.

class CreateEsporte(generics.CreateAPIView):
    queryset = Esporte.objects.all()
    serializer_class = Esporte_Serializer

    def perform_create(self, serializer):
        return serializer.save()


class QueryEsporte(generics.RetrieveUpdateDestroyAPIView):
    queryset = Esporte.objects.all()
    serializer_class = Esporte_Serializer

    def get_object(self):
        obj = get_object_or_404(Esporte, pk=self.kwargs['pk'])
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except:
            return Response({"error": "ID não encontrado/inválido"}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Esporte deletado com sucesso"}, status=status.HTTP_204_NO_CONTENT)


class QueryAllEsporte(generics.ListAPIView):
    serializer_class = Esporte_Serializer_GET

    def get_queryset(self):
        queryset = Esporte.objects.all()
        return queryset


def index(request):
    return HttpResponse("Endpoint esporte conectado com sucesso, utilizar os endpoints para acessar os métodos")