from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.core import validators as v

from apps.city.models import CityModel
from apps.user.managers import UserManager
from core.models import BaseModel
from core.enums.regex_enum import RegexEnum


class UserModel(AbstractBaseUser, PermissionsMixin, BaseModel):
    class Meta:
        db_table = "auth_user"

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    objects = UserManager()


class ProfileModel(BaseModel):
    class Meta:
        db_table = "profile"
        ordering = ["-id"]

    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name="profile")

    name = models.CharField(max_length=30, validators=[v.MinLengthValidator(1),
                                                       v.RegexValidator(RegexEnum.NAME.pattern,
                                                                        RegexEnum.NAME.msg)])
    surname = models.CharField(max_length=30, validators=[v.MinLengthValidator(1),
                                                          v.RegexValidator(RegexEnum.NAME.pattern,
                                                                           RegexEnum.NAME.msg)])
    age = models.IntegerField(validators=[v.MaxValueValidator(130), v.MinValueValidator(14)])
    phone = models.CharField(max_length=20,
                             validators=[v.RegexValidator(RegexEnum.PHONE.pattern, RegexEnum.PHONE.msg)],
                             blank=True)
    city = models.ForeignKey(CityModel, on_delete=models.SET_NULL, related_name="profiles", blank=True, null=True)
    add_int_info = models.TextField(blank=True, null=True, max_length=3000)
