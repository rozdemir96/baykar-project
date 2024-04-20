from django.db import models
from django.contrib.auth.models import User

from ihas.models import Ihas

# Create your models here.
class Rentals(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    iha = models.ForeignKey(Ihas, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    class Meta:
        db_table = 'rentals'