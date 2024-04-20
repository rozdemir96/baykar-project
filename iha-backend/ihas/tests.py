from decimal import Decimal
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Ihas
from categories.models import Categories
from sensors.models import Sensors

class IhasViewsetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('ihas_url')
        self.detail_url = reverse('ihas_url', kwargs={'id': 1})

    def test_get_ihas_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_ihas(self):
        category = Categories.objects.create(name='Test Category', description='Test Description')
        sensor = Sensors.objects.create(name='Test Sensor', description='Test Sensor Description')

        data = {
            'brand': 'Test Brand',
            'model': 'Test Model',
            'weight': 1.5,
            'category': category.id,
            'max_flight_time': 120,
            'max_range': 100.25,
            'battery_capacity': 5000,
            'sensors': [sensor.id]
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ihas.objects.count(), 1)
        self.assertEqual(Ihas.objects.get().brand, 'Test Brand')
        self.assertEqual(Ihas.objects.get().model, 'Test Model')
        self.assertEqual(Ihas.objects.get().weight, 1.5)
        self.assertEqual(Ihas.objects.get().category.id, category.id)
        self.assertEqual(Ihas.objects.get().max_flight_time, 120)
        self.assertEqual(Ihas.objects.get().max_range, Decimal('100.25'))
        self.assertEqual(Ihas.objects.get().battery_capacity, 5000)
        self.assertEqual(list(Ihas.objects.get().sensors.all()), [sensor])

    def test_create_ihas_invalid_data(self):
        data = {
            'brand': '',  # Eksik veri girişi
            'model': 'Test Model',
            'weight': 'abc',  # Geçersiz veri girişi
            'category': 'Test Category'
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Ihas.objects.count(), 0)

    def test_update_ihas(self):
        ihas = Ihas.objects.create(
            brand='Old Brand',
            model='Old Model',
            weight=2.0,
            category=Categories.objects.create(name='Old Category', description='Old Description')
        )

        category = Categories.objects.create(name='New Category', description='New Description')
        sensor = Sensors.objects.create(name='New Sensor', description='New Sensor Description')

        data = {
            'brand': 'New Brand',
            'model': 'New Model',
            'weight': 1.8,
            'category': category.id,
            'max_flight_time': 150,
            'max_range': 200.75,
            'battery_capacity': 6000,
            'sensors': [sensor.id]
        }

        detail_url = reverse('ihas_url', kwargs={'id': ihas.id})
        response = self.client.put(detail_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Ihas.objects.get(id=ihas.id).brand, 'New Brand')
        self.assertEqual(Ihas.objects.get(id=ihas.id).model, 'New Model')
        self.assertEqual(Ihas.objects.get(id=ihas.id).weight, 1.8)
        self.assertEqual(Ihas.objects.get(id=ihas.id).category.id, category.id)
        self.assertEqual(Ihas.objects.get(id=ihas.id).max_flight_time, 150)
        self.assertEqual(Ihas.objects.get(id=ihas.id).max_range, Decimal('200.75'))
        self.assertEqual(Ihas.objects.get(id=ihas.id).battery_capacity, 6000)
        self.assertEqual(list(Ihas.objects.get(id=ihas.id).sensors.all()), [sensor])

    def test_delete_ihas(self):
        ihas = Ihas.objects.create(
            brand='Test Brand',
            model='Test Model',
            weight=1.5,
            category=Categories.objects.create(name='Test Category', description='Test Description')
        )

        detail_url = reverse('ihas_url', kwargs={'id': ihas.id})
        response = self.client.delete(detail_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Ihas.objects.count(), 0)
