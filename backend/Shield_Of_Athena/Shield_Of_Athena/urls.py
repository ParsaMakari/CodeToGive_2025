from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("Users.urls")),
    path("api/donations/", include("Donations.urls")),
    path("api/impact-pathways/", include("Impact.urls")),
    path("api/stories/", include('Stories.urls')),
]
