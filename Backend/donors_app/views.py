from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from bson.errors import InvalidId

from core_api.permissions import IsAdminUser
from core_api.s3 import upload_to_s3, delete_from_s3
from donors_app.models import Donor, serialize_donor
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
            serialize_donor(donor),
            status=status.HTTP_201_CREATED,
        )


class DonorDetailView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, donor_id):
        try:
            donor = Donor.get_by_id(donor_id)
        except InvalidId:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if not donor:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
            
        delete_from_s3(donor.get("photo_url"))
        Donor.delete(donor_id)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, donor_id):
        try:
            donor = Donor.get_by_id(donor_id)
        except InvalidId:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        if not donor:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        name = data.get("name")
        amount_donated = data.get("amount_donated")
        village = data.get("village")
        current_place = data.get("current_place")
        photo = data.get("photo")
        
        if not name or amount_donated is None:
            return Response({"detail": "Missing mandatory fields."}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            parsed_amount = float(amount_donated)
        except (ValueError, TypeError):
            return Response({"detail": "Invalid amount donated."}, status=status.HTTP_400_BAD_REQUEST)
            
        update_data = {
            "name": str(name),
            "amount_donated": parsed_amount,
            "village": str(village or ""),
            "current_place": str(current_place or ""),
        }

        if photo and photo not in ["null", "undefined"]:
            try:
                new_photo_url = upload_to_s3(photo, "donors")
                delete_from_s3(donor.get("photo_url"))
                update_data["photo_url"] = new_photo_url
            except ValueError as exc:
                return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
                
        Donor.update(donor_id, update_data)
        updated_donor = Donor.get_by_id(donor_id)
        return Response(serialize_donor(updated_donor))