from rest_framework import serializers
from .models import Rentals

class RentalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rentals
        fields = '__all__'