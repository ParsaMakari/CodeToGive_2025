from .models import Donation
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializer import DonationSerializer
from .email import confirmation


@api_view(["POST"])
@permission_classes([AllowAny])
def donate(request):
    serializer = DonationSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        donation = serializer.save()
        user = request.data.get("user");
        first_name = None
        recipient_email = None
        if user:
            first_name = user["username"] or user["first_name"]
            recipient_email = user["email"] or None

        print(user)
    
        confirmation(
            first_name or "Donor",
            donation.amount,
            donation.currency,
            impact_pathway_name=getattr(donation, "impact_pathway_slug", None),
            recipient_email=recipient_email,
        )
        return Response(DonationSerializer(donation).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



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