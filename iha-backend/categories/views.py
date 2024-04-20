from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Categories
from .serializers import CategoriesSerializer

class CategoriesViewset(APIView):

    def get(self, request):
        categories_objects = Categories.objects.all()
        serializer = CategoriesSerializer(categories_objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            category_object = Categories.objects.get(id=id)
        except Categories.DoesNotExist:
            return Response({"detail": "Kategori kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategoriesSerializer(category_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            category_object = Categories.objects.get(id=id)
        except Categories.DoesNotExist:
            return Response({"detail": "Kategori kaydı bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        category_object.delete()
        response_data = {
            "status": "success",
            "data": "Kategori kaydı başarıyla silindi."
        }
        return Response(response_data, status=status.HTTP_200_OK)
