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
        user = getattr(donation, "user", None)
        first_name = None
        recipient_email = None
        if user:
            first_name = user.first_name or user.username
            recipient_email = user.email or None

        confirmation(
            first_name or "",
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