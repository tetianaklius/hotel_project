from rest_framework import serializers

from apps.region.models import RegionModel


class RegionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionModel
        fields = ("id", "name", "value")

