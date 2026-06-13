from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core_api.permissions import IsAdminUser
from core_api.s3 import upload_to_s3
from donors_app.models import Donor
from donors_app.serializers import DonorSerializer


class DonorListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []

    def get(self, request):
        return Response(Donor.get_all())

    def post(self, request):
        serializer = DonorSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            photo_url = upload_to_s3(serializer.validated_data["photo"], "donors")
        except ValueError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        donor = Donor.create(
            name=serializer.validated_data["name"],
            amount_donated=serializer.validated_data["amount_donated"],
            village=serializer.validated_data["village"],
            current_place=serializer.validated_data["current_place"],
            photo_url=photo_url,
        )
        return Response(
            {
                "id": str(donor["_id"]),
                "name": donor["name"],
                "amount_donated": donor["amount_donated"],
                "village": donor["village"],
                "current_place": donor["current_place"],
                "photo_url": donor["photo_url"],
                "added_on": donor["added_on"].isoformat(),
            },
            status=status.HTTP_201_CREATED,
        )


class DonorDetailView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, donor_id):
        if not Donor.delete(donor_id):
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)