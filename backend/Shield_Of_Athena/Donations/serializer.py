from rest_framework import serializers
from Users.serializer import UserSerializer
from .models import Donation











class DonationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    date = serializers.DateField(format="%Y-%m-%d")

    class Meta:
        model = Donation
        fields = ["id", "amount","currency", "is_recurring", "date", "user"]
        