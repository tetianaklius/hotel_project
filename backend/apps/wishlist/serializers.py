from rest_framework import serializers

from apps.room.serializers import RoomModelSerializer
from apps.wishlist.models import WishlistModel


class WishlistModelSerializer(serializers.ModelSerializer):
    rooms = RoomModelSerializer(many=True, read_only=True)

    class Meta:
        model = WishlistModel
        fields = ("id", "user", "rooms")
        read_only_fields = ("id", "created_at", "updated_at")

    # def update(self, instance, validated_data):
    # def create(self, validated_data):
    #     user = self.r
    #     rooms = self.initial_data["rooms"]
    #
    #     wish_rooms = []
    #
    #     for room in rooms:
    #         if room in wish_rooms:
    #             wish_rooms.remove(RoomModel.objects.get(pk=room["id"]))
    #         else:
    #             wish_rooms.append(RoomModel.objects.get(pk=room["id"]))
    #
    #     if request.user.is_authenticated and :
    #
    #     wishlist = WishlistModel.objects.create(**validated_data)
    #     wishlist.rooms.set(wish_rooms)
    #     return wishlist
