from rest_framework import serializers
from .models import Donation
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name","username", "email"]

class DonationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    date = serializers.DateField(format="%Y-%m-%d")

    class Meta:
        model = Donation
        fields = ["id", "amount", "date", "user"]
        
    
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields=["username","first_name","last_name", "email", "password"]

    def validate_password(self, value):
        validate_password(value)
        return value
    
     
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)