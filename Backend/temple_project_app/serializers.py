from rest_framework import serializers


class UpdatePostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    image = serializers.ImageField()


class EventPhotoSerializer(serializers.Serializer):
    image = serializers.ImageField()
