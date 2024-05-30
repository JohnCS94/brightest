from django.utils.dateparse import parse_datetime

from usages.models import CreateUsageInputPayload, GetUsagesInputPayload, Usage
from usages.serializers import UsageSerialzer
from usages.utils import normalize_quantity

from pydantic import ValidationError

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def get_usages(request):
    try:
        start = request.GET.get('start')
        end = request.GET.get('end')

        input_payload = GetUsagesInputPayload(start=start, end=end)
        start_datetime = parse_datetime(input_payload.start)
        end_datetime = parse_datetime(input_payload.end)
        if not start_datetime or not end_datetime:
            raise ValueError("Invalid datetime format")

        usages = Usage.objects.filter(created_at__gte=start_datetime, created_at__lte=end_datetime)
        serializer = UsageSerialzer(usages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except ValidationError as e:
        errors = e.errors()
        return Response(
            errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    except ValueError as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"error": f"Unexpected error: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(["POST"])
def create_usage(request):
    try:
        input_payload = CreateUsageInputPayload(**request.data)

        normalized_quantity = normalize_quantity(input_payload.quantity, input_payload.unit)

        usage = Usage.objects.create(
            quantity=normalized_quantity,
            unit=input_payload.unit
        )

        serializer = UsageSerialzer(usage)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
    except ValidationError as e:
        errors = e.errors()
        return Response(
            errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"error": f"Unexpected error: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST
        )
