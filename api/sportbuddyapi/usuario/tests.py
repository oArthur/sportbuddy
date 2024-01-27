from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Usuario

class UsuarioViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_usuario(self):
        url = reverse('create-usuario')
        data = {
            # Include your valid user creation data here
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_query_usuario_valid(self):
        user = Usuario.objects.create(username='testuser', password='testpassword')  # Add necessary user details
        url = reverse('usuario-detail', kwargs={'pk': user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_query_usuario_invalid(self):
        url = reverse('usuario-detail', kwargs={'pk': 9999})  # Assuming 9999 is an invalid user ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_login_valid_credentials(self):
        user = Usuario.objects.create(email='test@example.com', password='testpassword')  # Add necessary user details
        url = reverse('login')
        data = {
            'email': 'test@example.com',
            'password': 'testpassword',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {
            'email': 'nonexistent@example.com',
            'password': 'invalidpassword',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_friendship_views(self):
        user = Usuario.objects.create(username='user1', password='password1')  # Add necessary user details
        friend = Usuario.objects.create(username='user2', password='password2')  # Add necessary friend details
        url = reverse('friendship-views', kwargs={'pk': user.pk})

        # Test adding a friend
        data_add_friend = {
            'friend_id': friend.pk,
            'operation': 'add',
        }
        response_add_friend = self.client.post(url, data_add_friend, format='json')
        self.assertEqual(response_add_friend.status_code, status.HTTP_201_CREATED)

        # Test rejecting a friend request
        data_reject_friend = {
            'friend_id': friend.pk,
            'operation': 'reject',
        }
        response_reject_friend = self.client.post(url, data_reject_friend, format='json')
        self.assertEqual(response_reject_friend.status_code, status.HTTP_200_OK)

        # Test ignoring a user
        data_ignore_user = {
            'friend_id': friend.pk,
            'operation': 'ignore',
        }
        response_ignore_user = self.client.post(url, data_ignore_user, format='json')
        self.assertEqual(response_ignore_user.status_code, status.HTTP_200_OK)

    def test_index(self):
        url = reverse('index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
