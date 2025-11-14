from django.urls import path
from .views import get_user, get_donation_per_user, sign_up, list_donations
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)






urlpatterns = [
    path("user", get_user, name="get_user"),
    path("sign-up", sign_up, name="sign_up"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("my-donations", get_donation_per_user, name="user donation history" ),
    path("donations", list_donations, name=" all donation history" )
    
]
