from django.urls import path
from . import views
from .views import QueryAllEsporte, QueryEsporte, CreateEsporte

urlpatterns = [
    path("api/<int:pk>/", QueryEsporte.as_view(), name='query_esporte'),
    path("api/", CreateEsporte.as_view(), name='create_esporte'),
    path("api/all/", QueryAllEsporte.as_view(), name='get_esporte'),
]