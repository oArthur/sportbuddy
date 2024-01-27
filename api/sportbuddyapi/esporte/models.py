from django.db import models
from rest_framework import serializers

# Create your models here.


class Esporte(models.Model):
    nome = models.CharField(max_length=255, null=False, blank=False)
    descricao = models.CharField(max_length=255)
    forma_pratica = models.BooleanField(null=False, blank=False)


class Esporte_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Esporte
        fields = '__all__'

class Esporte_Serializer_GET(serializers.ModelSerializer):
    key = serializers.CharField(source='id')
    value = serializers.CharField(source='nome')

    class Meta:
        model = Esporte
        fields = ('key', 'value')