from rest_framework import serializers
from sensors.models import Sensors

class SensorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensors
        fields = '__all__'