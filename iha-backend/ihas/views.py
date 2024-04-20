from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ihas
from .serializers import IhasSerializer

from django.contrib.auth.forms import UserCreationForm
from .serializers import UserSerializer
from django.views.generic.edit import CreateView
from django.contrib.auth.models import User

class IhasViewset(APIView):
    def get(self, request):
        ihas_objects = Ihas.objects.all()
        serializer = IhasSerializer(ihas_objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = IhasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            ihas_object = Ihas.objects.get(id=id)
        except Ihas.DoesNotExist:
            return Response({"detail": "Ihas not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = IhasSerializer(ihas_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            ihas_object = Ihas.objects.get(id=id)
        except Ihas.DoesNotExist:
            return Response({"detail": "Ihas not found."}, status=status.HTTP_404_NOT_FOUND)

        ihas_name = ihas_object.brand + ' ' +ihas_object.model
        ihas_object.delete()
        response_data = {
        "status": "success",
        "data": f"{ihas_name} isimli İha silindi."
        }
        return Response(response_data, status=status.HTTP_200_OK)
    