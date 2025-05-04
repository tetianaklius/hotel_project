from rest_framework import serializers

from apps.category.models import CategoryModel


class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ("id", "is_visible", "name", "value", "profanity_count", "updated_at", "created_at")
        read_only_fields = ("id", "created_at", "profanity_count", "updated_at")
