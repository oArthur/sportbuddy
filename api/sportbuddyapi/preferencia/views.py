from django.http import HttpResponse
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import *


# Como usar os endpoints:
# Path padrão para os endpoints - hostname/esporte/api - Ex: http://localhost:8000/preferencia/api
# Criar Preferencia: Enviar com método POST um json com os campos requeridos, modelo abaixo:
#     {
#         "usuario_preferencia": id_do_usuario,
#         "esporte_preferencia": id_esporte
#     }
# PS: forma_pratica: 0 - Individual | 1 - Em equipe
# Ler/Retornar Esporte: Enviar método GET com o id do usuário no prório link da request:
#     http://localhost:8000/esporte/api/1
#
# Atualizar Esporte: Enviar método PUT com o id do Esporte no header da request e um json no corpo
# da request, JSON do mesmo modelo do Criar Esporte
#
# Deletar Esporte: Enviar método DELETE com o id do Esporte no header da request.

class CreatePreferencia(generics.CreateAPIView):
    queryset = Preferencia.objects.all()
    serializer_class = PreferenciaSerializer

    def perform_create(self, serializer):
        return serializer.save()


class AddPreferenciaToUsuario(generics.CreateAPIView):
    queryset = Preferencia.objects.all()
    serializer_class = PreferenciaSerializerAddPreferencia


#Request.user -


class QueryPreferencia(generics.RetrieveUpdateDestroyAPIView):
    queryset = Preferencia.objects.all()
    serializer_class = PreferenciaSerializer

    def get_object(self):
        obj = get_object_or_404(Preferencia, pk=self.kwargs['pk'])
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


class ListAllPreferencias(generics.ListAPIView):
    queryset = Preferencia.objects.all()
    serializer_class = PreferenciaSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class PreferenciaViewSet(viewsets.ModelViewSet):
    queryset = Preferencia.objects.all()
    serializer_class = PreferenciaSerializer

    @action(detail=False, methods=['get'])
    def get_user_preferencia(self, request, *args, **kwargs):
        try:
            obj = Preferencia.objects.get(usuario_preferencia=self.kwargs['usuario_preferencia'])
            todos_esportes = Esporte.objects.all()
            
            response = [
                {
                    "key": esporte.pk,
                    "value": esporte.nome,
                    "selected": esporte.pk in obj.esporte_preferencia.all().values_list('id', flat=True),
                    "locais": obj.local_preferencia
                } for esporte in todos_esportes
            ]
            print(response)
            return Response(response, status=status.HTTP_200_OK)
        
        except Exception as e:
            response = [
                {
                    "key": esporte.pk,
                    "value": esporte.nome,
                    "selected": False,
                    "locais": ""
                } for esporte in Esporte.objects.all()
            ]
            return Response(response, status=status.HTTP_200_OK)


def index(request):
    return HttpResponse("Endpoint preferencia conectado com sucesso, utilizar os endpoints para acessar os métodos")