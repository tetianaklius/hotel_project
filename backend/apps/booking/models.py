from django.db import models

from apps.room.models import RoomModel
from apps.user.models import ProfileModel
from core.models import BaseModel
from django.core import validators as v


class BookingModel(BaseModel):
    class Meta:
        db_table = "bookings"
        ordering = ["-id"]

    status = models.CharField(max_length=15, validators=[v.MinLengthValidator(5)], default="_")
    room = models.ForeignKey(RoomModel, on_delete=models.SET_NULL, null=True, related_name="bookings")
    # period =
    user_profile = models.ForeignKey(ProfileModel, on_delete=models.SET_NULL, null=True, related_name="bookings")
    persons = models.IntegerField(blank=False, validators=[v.MinValueValidator(1), v.MaxValueValidator(4)])
    comment = models.TextField(blank=True, validators=[v.MaxLengthValidator(500)])
    comment_internal = models.TextField(blank=True, validators=[v.MaxLengthValidator(1500)])
    prepayment = models.BooleanField(default=False)
    payment = models.BooleanField(default=False)
