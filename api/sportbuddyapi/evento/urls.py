from django.urls import path
from .views import *

urlpatterns = [
    path("api/<int:pk>", QueryEvento.as_view(), name='query_Evento'),
    path("api", CreateEvento.as_view(), name='create_Evento'),
    path("api/recomendado/<int:pk>", ListAllEventos.as_view(), name='lista_Evento'),
    path("api/join/<int:pk>/<int:id_usuario>", ManageEvento.as_view(), name='join_evento'),
]