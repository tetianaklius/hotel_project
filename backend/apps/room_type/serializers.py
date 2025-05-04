from rest_framework import serializers

from apps.room_type.models import RoomTypeModel


class RoomTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTypeModel
        fields = (
            "id", "is_visible", "name", "value", "profanity_count", "max_capacity", "updated_at", "created_at")
        read_only_fields = ("id", "created_at", "profanity_count", "updated_at")
