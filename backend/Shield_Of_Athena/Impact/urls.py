from django.urls import path
from .views import impact_pathways, impact_journey



urlpatterns = [
   path("", impact_pathways, name="impact_pathways"),
    path("journey/", impact_journey, name="impact_journey"),
]



