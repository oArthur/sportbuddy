from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path("api/<int:pk>", QueryPreferencia.as_view(), name='query_preferencia'),
    path("api/my/<int:usuario_preferencia>", PreferenciaViewSet.as_view({'get': 'get_user_preferencia'}), name='get_user_preferencia'),
    path("api", CreatePreferencia.as_view(), name='create_preferencia'),
    path("api/all", ListAllPreferencias.as_view(), name='lista_preferencia')
]