from django.http import HttpResponseRedirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core_api.permissions import IsAdminUser
from core_api.s3 import upload_to_s3
from temple_project_app.models import EventPhoto, UpdatePost
from temple_project_app.serializers import EventPhotoSerializer, UpdatePostSerializer


class UpdatePostListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []

    def get(self, request):
        return Response(UpdatePost.get_all())

    def post(self, request):
        serializer = UpdatePostSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            image_url = upload_to_s3(serializer.validated_data["image"], "updates")
        except ValueError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        post = UpdatePost.create(
            title=serializer.validated_data["title"],
            description=serializer.validated_data["description"],
            image_url=image_url,
        )
        return Response(
            {
                "id": str(post["_id"]),
                "title": post["title"],
                "description": post["description"],
                "image_url": post["image_url"],
                "created_at": post["created_at"].isoformat(),
            },
            status=status.HTTP_201_CREATED,
        )


class UpdatePostDetailView(APIView):
    def get_permissions(self):
        if self.request.method == "DELETE":
            return [IsAdminUser()]
        return []

    def get(self, request, post_id):
        post = UpdatePost.get_by_id(post_id)
        if not post:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(post)

    def delete(self, request, post_id):
        if not UpdatePost.delete(post_id):
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventPhotoListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []

    def get(self, request):
        return Response(EventPhoto.get_all())

    def post(self, request):
        serializer = EventPhotoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            image_url = upload_to_s3(serializer.validated_data["image"], "events")
        except ValueError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        photo = EventPhoto.create(image_url=image_url)
        return Response(
            {
                "id": str(photo["_id"]),
                "image_url": photo["image_url"],
                "uploaded_at": photo["uploaded_at"].isoformat(),
            },
            status=status.HTTP_201_CREATED,
        )


class EventPhotoDetailView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, photo_id):
        if not EventPhoto.delete(photo_id):
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventPhotoDownloadView(APIView):
    def get(self, request, photo_id):
        photo = EventPhoto.get_by_id(photo_id)
        if not photo:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return HttpResponseRedirect(photo["image_url"])
