from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    message = "User is not the admin"

    def has_permission(self, request, view):
        return (request.user.is_authenticated
                and request.user.is_staff
                and request.user.profile_staff.role.title == "admin"
                )
