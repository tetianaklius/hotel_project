from django.db import models
from django.contrib.auth import get_user_model

from apps.room.models import RoomModel
from core.models import BaseModel

UserModel = get_user_model()

class WishlistModel(BaseModel):
    class Meta:
        db_table = "wishlists"
        ordering = ["-id"]

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="wishlist")
    rooms = models.ManyToManyField(RoomModel, related_name="wishlists", blank=True)

    def __str__(self):
        return f"${self.user.name}`s wishlist"