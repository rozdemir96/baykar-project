from django.urls import path
from .views import SensorsViewset

urlpatterns = [
    path('sensors', SensorsViewset.as_view(), name='sensors_url'),
    path('sensors/<int:id>', SensorsViewset.as_view(), name='sensors_url'),
]