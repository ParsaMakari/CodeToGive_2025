from django.urls import path
from .views import get_user, sign_up, EmailTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)






urlpatterns = [
    path("user", get_user, name="get_user"),
    path("register", sign_up, name="sign_up"),
    path('login', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
