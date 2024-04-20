from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Rentals
from ihas.models import Ihas
from categories.models import Categories
from sensors.models import Sensors
import datetime
import pytz
from django.utils import timezone

class RentalsViewsetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('rentals_url')

        # Kullanıcı oluştur
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Kategori oluştur
        self.category = Categories.objects.create(name='Test Category', description='Test description')

        # Sensör oluştur
        self.sensor = Sensors.objects.create(name='Test Sensor', description='Test description')

        # İha oluştur
        self.iha = Ihas.objects.create(
            brand='Test Brand',
            model='Test Model',
            weight=1.5,
            category=self.category,
            max_flight_time=10,
            max_range=100.0,
            battery_capacity=5000
        )
        self.iha.sensors.add(self.sensor)

        # Tarihleri aynı formatta ve UTC'ye dönüştürerek tanımla
        self.start_date = timezone.now().replace(tzinfo=pytz.UTC)
        self.end_date = self.start_date + datetime.timedelta(days=7)

    def test_create_rental(self):
        data = {
            'user': self.user.id,
            'iha': self.iha.id,
            'start_date': self.start_date,
            'end_date': self.end_date
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Rentals.objects.count(), 1)
        self.assertEqual(Rentals.objects.get().user, self.user)
        self.assertEqual(Rentals.objects.get().iha, self.iha)
        self.assertEqual(Rentals.objects.get().start_date, self.start_date)
        self.assertEqual(Rentals.objects.get().end_date, self.end_date)

    def test_create_rental_invalid_data(self):
        data = {
            'user': '',  # Eksik veri girişi
            'iha': self.iha.id,
            'start_date': self.start_date,
            'end_date': self.end_date
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Rentals.objects.count(), 0)

    def test_delete_rental(self):
        rental = Rentals.objects.create(
            user=self.user,
            iha=self.iha,
            start_date=self.start_date,
            end_date=self.end_date
        )

        response = self.client.delete(reverse('rentals_url', kwargs={'id': rental.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Rentals.objects.count(), 0)
