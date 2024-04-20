from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#from .models import Sensors, Ihas
from sensors.models import Sensors
from ihas.models import Ihas
from .serializers import SensorsSerializer

class SensorsViewset(APIView):

    def get(self, request):
        sensors_objects = Sensors.objects.all()
        serializer = SensorsSerializer(sensors_objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SensorsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            sensors_object = Sensors.objects.get(id=id)
        except Sensors.DoesNotExist:
            return Response({"detail": "Sensör kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SensorsSerializer(sensors_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            sensors_object = Sensors.objects.get(id=id)
        except Sensors.DoesNotExist:
            return Response({"detail": "Sensör kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        sensors_object.delete()
        response_data = {
            "status": "success",
            "data": "Sensör kaydı başarıyla silindi."
        }
        return Response(response_data, status=status.HTTP_200_OK)


class IhasSensorsView(APIView):

    def post(self, request, ihas_id=None, sensor_id=None):
        try:
            ihas = Ihas.objects.get(id=ihas_id)
            sensor = Sensors.objects.get(id=sensor_id)
        except (Ihas.DoesNotExist, Sensors.DoesNotExist):
            return Response({"detail": "İha veya sensör kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        ihas.sensors.add(sensor)
        return Response({"detail": "Sensör, İha'ya başarıyla eklendi."}, status=status.HTTP_200_OK)

    def delete(self, request, ihas_id=None, sensor_id=None):
        try:
            ihas = Ihas.objects.get(id=ihas_id)
            sensor = Sensors.objects.get(id=sensor_id)
        except (Ihas.DoesNotExist, Sensors.DoesNotExist):
            return Response({"detail": "İha veya sensör kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        ihas.sensors.remove(sensor)
        return Response({"detail": "Sensör, İha'dan başarıyla çıkarıldı."}, status=status.HTTP_200_OK)
