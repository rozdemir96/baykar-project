from rest_framework import serializers
from .models import Ihas
from django.contrib.auth.models import User


class IhasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ihas
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']