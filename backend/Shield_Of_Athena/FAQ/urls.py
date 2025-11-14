from django.urls import path
from .views import faqs_list

urlpatterns = [
    path('', faqs_list, name='faqs_list'),
]
