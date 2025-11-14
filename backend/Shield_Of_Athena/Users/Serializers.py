from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        Model = User
        Fields = ["id", "name", "last_name","username", "email"]
    
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields=["username", "email", "password"]

    def validate_password(self, value):
        validate_password(value)
        return value
    
     
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)