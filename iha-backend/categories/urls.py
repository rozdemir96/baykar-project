from django.urls import path
from .views import CategoriesViewset

urlpatterns = [
    path('categories', CategoriesViewset.as_view(), name='categories_url'),
    path('categories/<int:id>', CategoriesViewset.as_view(), name='categories_url'),
]