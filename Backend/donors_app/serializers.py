from rest_framework import serializers


class DonorSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    amount_donated = serializers.FloatField(min_value=0)
    village = serializers.CharField(max_length=255, allow_blank=True, required=False)
    current_place = serializers.CharField(max_length=255, allow_blank=True, required=False)
    photo = serializers.ImageField()
