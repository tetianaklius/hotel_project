from django.db import models

from apps.booking.models import BookingModel
from core.models import BaseModel
from django.core import validators as v


class ReviewModel(BaseModel):
    class Meta:
        db_table = "review"
        ordering = ["-id"]

    is_visible = models.BooleanField(default=True)
    # author =
    rating = models.IntegerField(validators=[v.MinValueValidator(1), v.MaxValueValidator(5)])
    comment = models.TextField(validators=[v.MaxLengthValidator(2000)])
    booking = models.OneToOneField(BookingModel, on_delete=models.CASCADE, related_name="review")
    profanity_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])
