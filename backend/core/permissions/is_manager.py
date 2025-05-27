from rest_framework.permissions import BasePermission


class IsManager(BasePermission):
    message = "User is not the manager"

    def has_permission(self, request, view):
        return (request.user.groups.filter(name="managers").exists()

                # request.user.is_authenticated
                # and request.user.is_staff
                # and request.user.profile_staff.role.title == "manager"
                )
