from rest_framework import serializers

from apps.profile_staff.models import ProfileStaffModel


class ProfileStaffModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileStaffModel
        fields = (
            "id", "is_active", "user_id", "role", "work_experience", "work_phone", "work_email", "updated_at",
            "created_at")
        read_only_fields = ("id", "user_id", "updated_at", "created_at", "user_id")
