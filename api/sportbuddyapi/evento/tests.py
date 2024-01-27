from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Evento, Usuario, Preferencia, Esporte

class EventoViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_evento(self):
        url = reverse('create_Evento')
        data = {
            'nome': 'Nome do evento',
            'data_inicio': '2023-11-13T12:00:00Z',
            'data_fim': '2023-11-14T18:00:00Z',
            'local_evento': 'Local do evento',
            'id_participantes': [1, 2],  # Replace with valid user IDs
            'esporte': 1,  # Replace with a valid sport ID
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_query_evento_valid(self):
        evento = Evento.objects.create(nome='Evento Test', data_inicio='2023-11-13T12:00:00Z', data_fim='2023-11-14T18:00:00Z', local_evento='Test Location')
        url = reverse('query_Evento', kwargs={'pk': evento.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_query_evento_invalid(self):
        url = reverse('query_Evento', kwargs={'pk': 9999})  # Assuming 9999 is an invalid event ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_all_eventos(self):
        user = Usuario.objects.create(id=1)  # Replace with a valid user ID
        url = reverse('lista_Evento', kwargs={'pk': user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_manage_evento_join(self):
        evento = Evento.objects.create(nome='Evento Test', data_inicio='2023-11-13T12:00:00Z', data_fim='2023-11-14T18:00:00Z', local_evento='Test Location')
        user = Usuario.objects.create(id=1)  # Replace with a valid user ID
        url = reverse('join_evento', kwargs={'pk': evento.pk, 'id_usuario': user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)  # Assuming GET request is not allowed

        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_index(self):
        url = reverse('index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Additional tests can be added for edge cases and specific scenarios.

# Add tests for URL patterns to ensure correct mapping and behavior.
