from rest_framework import serializers
from Users.serializer import UserSerializer
from .models import Donation



class DonationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    date = serializers.DateField(format="%Y-%m-%d")

    class Meta:
        model = Donation
        fields = ["id", "amount","currency", "is_recurring", "date", "user"]

    def create(self, validated_data): 
        request = self.context.get("request")
        user = getattr(request, "user", None)

        if user and user.is_authenticated: 
            validated_data["user"] = user
        else:
            validated_data["is_recurring"] = False; 

        return super().create(validated_data)
