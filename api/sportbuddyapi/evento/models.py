from django.db import models
from usuario.models import Usuario
from esporte.models import Esporte
from rest_framework import serializers
# Create your models here.


class Evento(models.Model):
    nome = models.CharField(max_length=255, null=False, blank=False)
    data_inicio = models.DateTimeField(null=False, blank=False)
    data_fim = models.DateTimeField(null=False, blank=False)
    local_evento = models.CharField(max_length=255, null=False, blank=False)
    id_participantes = models.ManyToManyField(Usuario, blank=True)
    esporte = models.ManyToManyField(Esporte, blank=False)
    criador = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='criador')


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'
