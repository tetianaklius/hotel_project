from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators as v

from apps.booking.models import BookingModel
from core.models import BaseModel

UserModel = get_user_model()

class ReviewModel(BaseModel):
    class Meta:
        db_table = "review"
        ordering = ["-id"]

    is_visible = models.BooleanField(default=True)
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(validators=[v.MinValueValidator(1), v.MaxValueValidator(5)])
    comment = models.TextField(validators=[v.MaxLengthValidator(2000), v.MinLengthValidator(5)], blank=False)
    booking = models.OneToOneField(BookingModel, on_delete=models.CASCADE, related_name="review")
    profanity_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])
