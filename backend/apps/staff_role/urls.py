from django.urls import path

from apps.staff_role.views import StaffRoleListCreateAPIView

urlpatterns = [
    path("", StaffRoleListCreateAPIView.as_view(), name="staff_role_list_create"),
]
