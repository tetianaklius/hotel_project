from django.db import models

from apps.category.models import CategoryModel
from apps.room_type.models import RoomTypeModel
from core.models import BaseModel
from django.core import validators as v


class RoomModel(BaseModel):
    class Meta:
        db_table = "room"
        ordering = ["-id"]

    is_active = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)
    category = models.ForeignKey(CategoryModel, on_delete=models.SET("WITHOUT_CATEGORY"), related_name="rooms")
    room_type = models.ForeignKey(RoomTypeModel, on_delete=models.SET("WITHOUT_ROOM_TYPE"), related_name="rooms")
    title = models.CharField(max_length=60, validators=[v.MinLengthValidator(2)], blank=False)
    floor = models.IntegerField(default=0)
    area = models.IntegerField(default=0)
    beds_num = models.IntegerField(default=0)
    desc = models.TextField(default="")
    price = models.IntegerField(default=0)
    # photo = models.ImageField(upload_to="photos/%Y/%m/%d/")
    # gallery = models.ImageField(upload_to="gallery")

    profanity_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])

