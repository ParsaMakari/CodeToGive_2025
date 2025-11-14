from django.urls import path
from .views import get_user, get_user_info, sign_up
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)






urlpatterns = [
    path("sign-in", get_user, name="get_user"),
    path("sign-up", sign_up, name="sign_up"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user/<int:id>/donations", get_user_info, name="donation history" )
]
