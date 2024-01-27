from django.contrib import admin
from .models import Usuario, Amizade, Ignorar, Notificacao
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Usuario, UserAdmin)
admin.site.register(Amizade)
admin.site.register(Ignorar)
admin.site.register(Notificacao)
