from django.urls import path
from .views import RentalsViewset

urlpatterns = [
    path('rentals', RentalsViewset.as_view(), name='rentals_url'),
    path('rentals/<int:id>', RentalsViewset.as_view(), name='rentals_url'),
]