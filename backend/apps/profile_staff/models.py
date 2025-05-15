from django.db import models
from django.contrib.auth import get_user_model

from apps.staff_role.models import StaffRoleModel
from core.models import BaseModel

UserModel = get_user_model()


class ProfileStaffModel(BaseModel):
    class Meta:
        db_table = "profile_staff"

    is_active = models.BooleanField(default=False)
    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="profile_staff")
    role = models.ForeignKey(StaffRoleModel, on_delete=models.SET("WITHOUT_ROLE"), related_name="profile_staff")
    work_experience = models.IntegerField(default=0, blank=False)
    work_phone = models.CharField(blank=False, max_length=10)  # todo
    work_email = models.EmailField(blank=True)  # todo