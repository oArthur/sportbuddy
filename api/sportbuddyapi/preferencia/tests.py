from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Preferencia, Esporte

class PreferenciaViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_preferencia(self):
        url = reverse('create_preferencia')
        data = {
            'usuario_preferencia': 1,  # Replace with a valid user ID
            'esporte_preferencia': 1,  # Replace with a valid sport ID
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_preferencia_to_usuario(self):
        url = reverse('add_preferencia_to_usuario')
        data = {
            'usuario_preferencia': 1,  # Replace with a valid user ID
            'esporte_preferencia': 1,  # Replace with a valid sport ID
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_query_preferencia_valid(self):
        preferencia = Preferencia.objects.create(usuario_preferencia=1, esporte_preferencia=1)  # Replace with valid data
        url = reverse('query_preferencia', kwargs={'pk': preferencia.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_query_preferencia_invalid(self):
        url = reverse('query_preferencia', kwargs={'pk': 9999})  # Assuming 9999 is an invalid preferencia ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_all_preferencias(self):
        url = reverse('lista_preferencia')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_preferencia_view_set_get_user_preferencia(self):
        user_id = 1  # Replace with a valid user ID
        url = reverse('get_user_preferencia', kwargs={'usuario_preferencia': user_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_index(self):
        url = reverse('index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Additional tests can be added for the PreferenciaViewSet actions, especially for edge cases and specific scenarios.

class PreferenciaViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_user_preferencia(self):
        user_id = 1  # Replace with a valid user ID
        url = reverse('get_user_preferencia', kwargs={'usuario_preferencia': user_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Additional tests for other actions in PreferenciaViewSet can be added here.

# Add tests for URL patterns to ensure correct mapping and behavior.
