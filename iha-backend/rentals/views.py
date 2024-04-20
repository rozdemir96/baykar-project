from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Rentals
from .serializers import RentalsSerializer

class RentalsViewset(APIView):

    def get(self, request):
        rentals_objects = Rentals.objects.all()
        serializer = RentalsSerializer(rentals_objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = RentalsSerializer(data=request.data)
        if serializer.is_valid():
            iha = serializer.validated_data['iha']
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            availability = self.check_iha_availability(iha, start_date, end_date)
            if availability['available']:
                serializer.save()
                message = f"İha başarıyla kiralandı. Kiralanma tarihleri: {start_date} - {end_date}"
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(availability, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def check_iha_availability(self, iha, start_date, end_date):
   
        # Kiralanmak istenen iha kontrol edilir
        existing_rentals = Rentals.objects.filter(iha=iha, end_date__gte=start_date)

        # Eğer bir kiralama kaydı bulunduysa, İha zaten kiralanmış demektir
        if existing_rentals.exists():
        
   
        # Kiralanmak istenen iha kontrol edilir
            existing_rentals = Rentals.objects.filter(iha=iha, end_date__gte=start_date)

        # Eğer bir kiralama kaydı bulunduysa, İha zaten kiralanmış demektir
        if existing_rentals.exists():
            return {
                'available': False,
                'message': "Kiralamak istediğiniz iha bu tarihlerde başka bir kullanıcı tarafından kullanılıyor."
            }

        return {
            'available': True,
            'message': "İha başarıyla kiralandı. Kiralanma tarihleri: {start_date} - {end_date}"
        }

   
        # Kiralanmak istenen iha kontrol edilir
        existing_rentals = Rentals.objects.filter(iha=iha, end_date__gte=start_date)

        # Eğer bir kiralama kaydı bulunduysa, İha zaten kiralanmış demektir
        if existing_rentals.exists():
            return {
                'available': False,
                'message': "Kiralamak istediğiniz iha bu tarihlerde başka bir kullanıcı tarafından kullanılıyor."
            }

        return {
            'available': True,
            'message': "Kiralama işlemi başarılı."
        }
    

    def put(self, request, id=None):
        try:
            rentals_object = Rentals.objects.get(id=id)
        except Rentals.DoesNotExist:
            return Response({"detail": "Kiralama kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        serializer = RentalsSerializer(rentals_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            rentals_object = Rentals.objects.get(id=id)
        except Rentals.DoesNotExist:
            return Response({"detail": "Kiralama kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        user_name = rentals_object.user.first_name + " " + rentals_object.user.last_name
        start_date = rentals_object.start_date
        end_date = rentals_object.end_date

        rentals_object.delete()
        response_data = {
            "status": "success",
            "data": f"{user_name} isimli kullanıcının {start_date} - {end_date} tarihleri arasında yaptığı kiralama kaydı silindi."
        }
        return Response(response_data, status=status.HTTP_200_OK)