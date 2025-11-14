from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from pathlib import Path
import json


@api_view(["GET"])
@permission_classes([AllowAny])
def impact_pathways(request):
	"""Return the impact_pathways.json content as JSON."""
	content_file = Path(__file__).resolve().parent / "impact_pathways.json"
	try:
		with content_file.open("r", encoding="utf-8") as f:
			data = json.load(f)
	except FileNotFoundError:
		return Response({"detail": "impact_pathways.json not found"}, status=status.HTTP_404_NOT_FOUND)
	except json.JSONDecodeError:
		return Response({"detail": "impact_pathways.json is invalid"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	return Response(data, status=status.HTTP_200_OK)


