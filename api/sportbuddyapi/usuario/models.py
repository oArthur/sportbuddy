from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import AbstractUser
from preferencia.models import Preferencia, PreferenciaSerializerGet

class Usuario(AbstractUser):
    email = models.EmailField("endereco de email", unique=True)
    cpf = models.CharField(max_length=11,null=True, blank=True)
    telefone = models.CharField(max_length=11,null=True, blank=True)
    aceitou_termo = models.BooleanField(default=False,null=False, blank=False)
    # nome = models.CharField(max_length=200, null=False, blank=False)
    # interesses = models.OneToOneField(
    #     Esporte,
    #     on_delete=models.CASCADE,
    # )
    # preferencia_locais = models.OneToOneField(
    #         Local,
    #         on_delete=models.CASCADE,
    #     )
    # email = models.EmailField(max_length=200, null=False, blank=False)
    # pontuacao = models.IntegerField()

class Amizade(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario')
    amigo = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='amigo')
    aceito = models.BooleanField(default=False)
    recusado = models.BooleanField(default=False)


class Ignorar(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_que_ignora')
    ignorado = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_ignorado')


class Notificacao(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_notificado')
    usuario_relacionado = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_relacionado', null=True, blank=True)
    evento_relacionado = models.ForeignKey('evento.Evento', on_delete=models.CASCADE, related_name='evento_relacionado', null=True, blank=True)
    tipo = models.CharField(max_length=200, null=False, blank=False, choices=[('friend_req', 'friend_req'), ('evento', 'evento'), ('req_update', 'req_update')], default='amizade')
    description = models.CharField(max_length=200, null=False, blank=False)
    title = models.CharField(max_length=200, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True, default="https://picsum.photos/200/200")
    date = models.DateTimeField(auto_now_add=True)
    lida = models.BooleanField(default=False)


class NotificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacao
        fields = '__all__'

class Usuario_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
class Usuario_Serializer_Profile_Show(serializers.ModelSerializer):
    preferencia = serializers.SerializerMethodField()

    def get_preferencia(self, obj):
        preferencia = Preferencia.objects.get(usuario_preferencia=obj)
        return PreferenciaSerializerGet(preferencia).data

    class Meta:
        model = Usuario
        fields = ['id', 'first_name', 'last_name', 'email', 'cpf', 'telefone','last_login','date_joined', 'preferencia']

class Usuario_Serializer_Login(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'password']
