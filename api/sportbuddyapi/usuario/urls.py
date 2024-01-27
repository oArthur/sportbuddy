from django.urls import path
from . import views
from .views import FriendshipViews, QueryUsuario,CreateUsuario, Login

urlpatterns = [
    path("api", CreateUsuario.as_view(), name='create_usuario'),
    path('api/<int:pk>', QueryUsuario.as_view(), name='usuario-detail'),
    path('api/login', Login.as_view(), name='login'),
    path('api/suggestion/<int:pk>', FriendshipViews.as_view({'get': 'get', 'post': 'post'}), name='friendship'),
    path('api/friends/<int:pk>', FriendshipViews.as_view({'get': 'get_all'}), name='friendship'),
    path("", views.index, name="index"),
    path("api/notificacao/<int:usuario>", views.NotificacaoViewSet.as_view({'get': 'get_queryset'}), name="notificacao"),
]