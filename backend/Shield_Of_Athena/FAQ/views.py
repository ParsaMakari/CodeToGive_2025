from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from pathlib import Path
import json


@api_view(["GET"])
@permission_classes([AllowAny])
def faqs_list(request):
	content_file = Path(__file__).resolve().parent / "faqs.json"
	try:
		with content_file.open("r", encoding="utf-8") as f:
			data = json.load(f)
	except FileNotFoundError:
		return Response({"detail": "faqs.json not found"}, status=status.HTTP_404_NOT_FOUND)
	except json.JSONDecodeError:
		return Response({"detail": "faqs.json is invalid"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	return Response(data, status=status.HTTP_200_OK)

