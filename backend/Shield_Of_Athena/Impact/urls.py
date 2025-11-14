from django.urls import path
from .views import impact_pathways



urlpatterns = [
	path('', impact_pathways, name='impact_pathways'),
]



