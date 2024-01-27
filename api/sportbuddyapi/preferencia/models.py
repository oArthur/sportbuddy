from django.db import models
from rest_framework import serializers
from esporte.models import Esporte


# Create your models here.
class Preferencia(models.Model):
    usuario_preferencia = models.OneToOneField('usuario.Usuario', on_delete=models.CASCADE)
    esporte_preferencia = models.ManyToManyField(Esporte)
    local_preferencia = models.CharField(max_length=200, blank=True, null=True)


class PreferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        fields = '__all__'

class PreferenciaSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        fields = '__all__'
        depth = 1


class PreferenciaSerializerAddPreferencia(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        fields = ['esporte_preferencia']