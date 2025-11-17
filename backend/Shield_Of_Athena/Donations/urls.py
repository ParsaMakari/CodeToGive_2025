from django.urls import path
from .views import get_donation_per_user,list_donations, donate







urlpatterns = [
    path("",donate, name="make donation"),
    path("me", get_donation_per_user, name="user donation history" ),
    path("all", list_donations, name=" all donation history" )
]
