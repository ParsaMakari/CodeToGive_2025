from rest_framework import serializers
from Users.serializer import UserSerializer
from .models import Donation
from datetime import date
import json

class DonationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    date = serializers.DateField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Donation
        fields = ["id", "amount", "currency", "is_recurring", "date", "user", "impact_pathway_slug","message"]
        extra_kwargs = {
            "date": {"read_only": True}
        }

    def create(self, validated_data):
        request = self.context.get("request")

        user = getattr((request), "user", None)

        # Auto-set date to today
        validated_data["date"] = date.today()

        if user and user.is_authenticated:
            validated_data["user"] = user
        else:
            validated_data["is_recurring"] = False

        return super().create(validated_data)
