from rest_framework import serializers

from apps.booking.models import BookingModel


class BookingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = ("id", "status", "room", "persons", "comment", "prepayment", "payment")
        read_only_fields = ("id", "created_at", "updated_at")


class BookingUpdateModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = ("id", "status", "room", "persons", "comment", "prepayment", "payment", "comment_internal")
        read_only_fields = ("id", "created_at", "updated_at", "comment")
