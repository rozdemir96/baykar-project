from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Sensors

class SensorsViewsetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('sensors_url')
        self.detail_url = reverse('sensors_url', kwargs={'id': 1})

    def test_get_sensors_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_sensor(self):
        data = {
            'name': 'Test Sensor',
            'description': 'Test Description'
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Sensors.objects.count(), 1)
        self.assertEqual(Sensors.objects.get().name, 'Test Sensor')

    def test_create_sensor_invalid_data(self):
        data = {
            'name': '',  # Eksik veri girişi
            'description': 'Test Description'
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Sensors.objects.count(), 0)

    def test_update_sensor(self):
        sensor = Sensors.objects.create(
            name='Old Sensor',
            description='Old Description'
        )

        data = {
            'name': 'New Sensor',
            'description': 'New Description'
        }

        detail_url = reverse('sensors_url', kwargs={'id': sensor.id})
        response = self.client.put(detail_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Sensors.objects.get(id=sensor.id).name, 'New Sensor')

    def test_delete_sensor(self):
        sensor = Sensors.objects.create(
            name='Test Sensor',
            description='Test Description'
        )

        detail_url = reverse('sensors_url', kwargs={'id': sensor.id})
        response = self.client.delete(detail_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Sensors.objects.count(), 0)
