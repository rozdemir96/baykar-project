from django.db import models
from django.contrib.auth.models import User

from categories.models import Categories
from sensors.models import Sensors
class Ihas(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    weight  = models.FloatField()
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    max_flight_time = models.PositiveIntegerField(blank=True, null=True)
    max_range = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    battery_capacity = models.PositiveIntegerField(blank=True, null=True)
    sensors = models.ManyToManyField(Sensors, blank=True, null=True)

    class Meta:
        db_table = 'ihas'

