from django.shortcuts import render
from .models import Donation
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer, RegisterSerializer, DonationSerializer
from django.contrib.auth.models import User





@api_view(["POST"])
@permission_classes([AllowAny])
def sign_up(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)  
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_donation_per_user (request):
    user = request.user
    donations = Donation.objects.filter(user = user)
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(["GET"])
@permission_classes([AllowAny])
def list_donations (request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)