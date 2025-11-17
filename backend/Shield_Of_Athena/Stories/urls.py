from django.urls import path
from .views import stories_list

urlpatterns = [
    path('', stories_list, name='stories_list'),
]
