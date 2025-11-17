from django.urls import path
from .views import quiz_questions

urlpatterns = [
    path('', quiz_questions, name='quiz_questions'),
]
