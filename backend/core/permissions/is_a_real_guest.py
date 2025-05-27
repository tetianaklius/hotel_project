from rest_framework.permissions import BasePermission


class IsARealGuest(BasePermission):
    message = "User has not been has a realized booking"

    def has_permission(self, request, view):
        return (
            request.user.groups.filter(name="real_guests").exists()

            # request.user.is_authenticated
            # and  # todo
        )
