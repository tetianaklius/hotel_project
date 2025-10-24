from rest_framework import serializers

from apps.booking.models import BookingModel


class BookingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = (
            "id", "status", "room", "persons", "comment", "start_date", "end_date", "prepayment", "payment",
            "user_profile"
        )
        read_only_fields = ("id", "status", "created_at", "updated_at", "prepayment", "payment")


class BookingModelAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = (
            "id", "status", "user_profile", "room", "persons", "comment", "start_date", "end_date", "prepayment",
            "payment"
        )
        read_only_fields = ("id", "created_at", "updated_at")

        # def create(self, validated_data):
        #     user_profile_id = validated_data.pop("user_profile")
        #     user_profile = ProfileModel.objects.get(pk=user_profile_id)  # todo


class BookingUpdateModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = ("id", "status", "room", "persons", "comment", "prepayment", "payment", "comment_internal")
        read_only_fields = ("id", "created_at", "updated_at", "comment")
