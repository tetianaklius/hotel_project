from rest_framework import serializers

from apps.review.models import ReviewModel


class ReviewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewModel
        fields = ("id", "is_visible", "rating", "comment", "booking", "profanity_count")
        read_only_fields = ("id", "created_at", "updated_at", "profanity_count")
