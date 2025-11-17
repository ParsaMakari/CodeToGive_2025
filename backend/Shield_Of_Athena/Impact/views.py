from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from pathlib import Path
from decimal import Decimal, InvalidOperation
from django.utils.timezone import now
import json


@api_view(["GET"])
@permission_classes([AllowAny])
def impact_pathways(request):
	content_file = Path(__file__).resolve().parent / "impact_pathways.json"
	try:
		with content_file.open("r", encoding="utf-8") as f:
			data = json.load(f)
	except FileNotFoundError:
		return Response({"detail": "impact_pathways.json not found"}, status=status.HTTP_404_NOT_FOUND)
	except json.JSONDecodeError:
		return Response({"detail": "impact_pathways.json is invalid"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	return Response(data, status=status.HTTP_200_OK)


def _load_pathways():
    """Utility: read impact_pathways.json once per request."""
    content_file = Path(__file__).resolve().parent / "impact_pathways.json"
    with content_file.open("r", encoding="utf-8") as f:
        return json.load(f)


@api_view(["GET"])
@permission_classes([AllowAny])
def impact_journey(request):
    """
    Returns an 'impact journey' for a donation.
    Query params:
      - amount: donation amount (e.g. 100)
      - pathway: pathway slug (e.g. 'emergency-shelter-safety')
      - lang: optional, for logging/analytics ('en'/'fr')
    """
    amount_raw = request.query_params.get("amount")

    if amount_raw in (None, "", "null"):
        amount = Decimal("0")
    else:
        try:
            amount = Decimal(str(amount_raw))
        except (InvalidOperation, ValueError, TypeError):
            return Response(
                {"detail": f"Invalid amount: {amount_raw!r}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    pathway_slug = request.query_params.get("pathway")
    lang = request.query_params.get("lang", "en")

    pathways = _load_pathways()

    pathway = next(
        (p for p in pathways if p.get("slug") == pathway_slug),
        None,
    )

    if pathway is None:
        return Response(
            {"detail": "Unknown impact pathway."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    current_amount = 3250000
    goal_amount = 5000000

    steps = [
        {
            "code": "DONATION_RECEIVED",
            "programCode": None,
        },
        {
            "code": "FUNDS_ALLOCATED",
            "programCode": pathway["slug"],
        },
        {
            "code": "IMMEDIATE_IMPACT",
            "programCode": pathway["slug"],
        },
        {
            "code": "LONG_TERM_IMPACT",
            "programCode": None,
        },
    ]

    data = {
        "donation": {
            "amount": str(amount),
            "currency": "CAD",
            "receivedAt": now().isoformat(),
        },
        "campaign": {
            "slug": "second-step-housing",
            "currentAmount": current_amount,
            "goalAmount": goal_amount,
        },
        "pathway": {
            "id": pathway["id"],
            "slug": pathway["slug"],
            "nameCode": "IMPACT_PATHWAY_" + pathway["slug"].upper().replace("-", "_"),
        },
        "steps": steps,
    }

    return Response(data, status=status.HTTP_200_OK)
