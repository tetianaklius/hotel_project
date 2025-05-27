from rest_framework import serializers

from apps.staff_role.models import StaffRoleModel


class StaffRoleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffRoleModel
        fields = ("id", "title", "value")

