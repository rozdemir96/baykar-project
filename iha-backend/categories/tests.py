from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Categories

class CategoriesViewsetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('categories_url')
        self.detail_url = reverse('categories_url', kwargs={'id': 1})

    def test_get_categories_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_category(self):
        data = {
            'name': 'Test Category',
            'description': 'Test Description'
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Categories.objects.count(), 1)
        self.assertEqual(Categories.objects.get().name, 'Test Category')

    def test_create_category_invalid_data(self):
        data = {
            'name': '',  # Eksik veri girişi
            'description': 'Test Description'
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Categories.objects.count(), 0)

    def test_update_category(self):
        category = Categories.objects.create(
            name='Old Category',
            description='Old Description'
        )

        data = {
            'name': 'New Category',
            'description': 'New Description'
        }

        detail_url = reverse('categories_url', kwargs={'id': category.id})
        response = self.client.put(detail_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Categories.objects.get(id=category.id).name, 'New Category')

    def test_delete_category(self):
        category = Categories.objects.create(
            name='Test Category',
            description='Test Description'
        )

        detail_url = reverse('categories_url', kwargs={'id': category.id})
        response = self.client.delete(detail_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Categories.objects.count(), 0)
