from django.db import models
from django.core import validators as v

from core.models import BaseModel


class RoomTypeModel(BaseModel):  # single double triple quadruple
    class Meta:
        db_table = "room_type"

    is_visible = models.BooleanField(default=True)
    name = models.CharField(max_length=15, validators=[v.MinLengthValidator(2)], blank=False)
    value = models.IntegerField(blank=False, unique=True)
    max_capacity = models.IntegerField(validators=[v.MinValueValidator(1), v.MaxValueValidator(4)], blank=False)

    profanity_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])
