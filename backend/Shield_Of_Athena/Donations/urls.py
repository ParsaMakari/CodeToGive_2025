from django.urls import path
from .views import get_donation_per_user,list_donations







urlpatterns = [
    path("me", get_donation_per_user, name="user donation history" ),
    path("all", list_donations, name=" all donation history" )
]
