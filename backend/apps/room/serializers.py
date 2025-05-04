from rest_framework import serializers

from apps.room.models import RoomModel


class RoomModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomModel
        fields = (
            "id", "is_active", "is_visible", "category", "room_type", "title", "floor", "area", "beds_num", "desc",
            "price",
            "profanity_count",)
        read_only_fields = ("id", "created_at", "updated_at", "profanity_count")
