from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db.transaction import atomic

from apps.user.models import ProfileModel
from core.services.email_service import EmailService

# from core.services.email_service import EmailService

UserModel = get_user_model()


class ProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = (
            "id",
            "name",
            "surname",
            "age",
            "phone",
            "city",
            "add_int_info",
            "created_at",
            "updated_at"
        )
        read_only_fields = ("id", "created_at", "updated_at", "city", "add_int_info")


class UserModelSerializer(serializers.ModelSerializer):
    profile = ProfileModelSerializer()

    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "password",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
            "profile"
        )
        read_only_fields = (
            "id", "is_active", "is_staff", "is_superuser", "last_login")
        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if "city" in self.context:
            attrs["profile"]["city"] = self.context["city"]
        return attrs

    @atomic
    def create(self, validated_data: dict):
        profile = validated_data.pop("profile")
        user = UserModel.objects.create_user(**validated_data)
        ProfileModel.objects.create(**profile, user=user)
        EmailService.registration(user)
        return user


class OwnProfileSerializer(serializers.ModelSerializer):
    profile = ProfileModelSerializer()

    class Meta:
        model = UserModel
        fields = (
            "id", "profile",
        )
        read_only_fields = (
            "id",
        )
        depth = 1
