from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from core.models import BaseModel
from django.core import validators as v


class CategoryModel(BaseModel):  # standard superior deluxe
    class Meta:
        db_table = "category"

    is_visible = models.BooleanField(default=True)
    name = models.CharField(max_length=15, validators=[v.MinLengthValidator(2)], blank=False)
    value = models.IntegerField(blank=False, unique=True, null=True,
                                validators=[MinValueValidator(1), MaxValueValidator(100)])

    profanity_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])
