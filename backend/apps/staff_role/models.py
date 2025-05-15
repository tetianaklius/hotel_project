from django.db import models
from django.core import validators as v

from core.models import BaseModel


class StaffRoleModel(BaseModel):
    class Meta:
        db_table = "staff_roles"
    title = models.CharField(max_length=15, validators=[v.MinLengthValidator(4)], blank=False)
    value = models.IntegerField(blank=False, unique=True)