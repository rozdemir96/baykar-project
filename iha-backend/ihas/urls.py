from django.urls import path
from .views import IhasViewset

urlpatterns = [
    path('ihas', IhasViewset.as_view(), name='ihas_url'),
    path('ihas/<int:id>', IhasViewset.as_view(), name='ihas_url'),
]
