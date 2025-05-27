from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.permissions import AllowAny

from apps.profile_staff.models import ProfileStaffModel
from apps.profile_staff.serializers import ProfileStaffModelSerializer
from core.permissions.is_admin import IsAdmin
from core.permissions.is_manager import IsManager

UserModel = get_user_model()


class UserToStaffUpdateView(RetrieveUpdateAPIView):  # todo
    serializer_class = ProfileStaffModelSerializer
    queryset = ProfileStaffModel.objects.all()
    permission_classes = [IsAdmin, IsManager]
    # permission_classes = [AllowAny]

    # на тому моменті, коли profile_staff стає is_active=True, працівники додаються до груп;

    def update(self, request, *args, **kwargs):
        # method for #1 admins and #2 managers
        user = self.request.user
        print(user.groups, "****************")

        # 1 # if request.user is admin
        group = Group.objects.get(name="hotel_admins")
        if group in user.groups.all():
            user_to_update = UserModel.objects.get(id=kwargs["pk"])
            serializer = ProfileStaffModelSerializer(request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(is_active=True)

            if serializer.data.role.title == "admin":  # todo можливо, тут можна якось універсалізувати
                group = Group.objects.get(name=f"hotel_admins")
                user_to_update.groups.add(group)
            elif serializer.data.role.title == "manager":
                group = Group.objects.get(name=f"hotel_managers")
                user_to_update.groups.add(group)
            elif serializer.data.role.title == "guest_manager":
                group = Group.objects.get(name=f"hotel_guest_managers")
                user_to_update.groups.add(group)
            elif serializer.data.role.title == "cleaner":
                group = Group.objects.get(name=f"hotel_cleaners")
                user_to_update.groups.add(group)
            elif serializer.data.role.title == "chef":
                group = Group.objects.get(name=f"hotel_chefs")
                user_to_update.groups.add(group)
            else:
                return Response({
                    "Details": "Sorry, there is some trouble here, contact your IT support"}, status=status.HTTP_403_FORBIDDEN
                )

            return Response(
                {
                    "Message": "User is updated successfully",
                    "User staff profile": serializer.data,
                    "User groups": [f"\n{group.name}\n" for group in user.groups.all()]
                }, status=status.HTTP_200_OK
            )

        # 2 # if request.user is manager
        group_name = f"hotel_managers"
        group = Group.objects.get(name=group_name)
        if group in user.groups.all():
            user_to_update = UserModel.objects.get(id=kwargs["pk"])
            serializer = ProfileStaffModelSerializer(request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(is_active=True)

            if serializer.data.role.title == "guest_manager":
                group = Group.objects.get(name=f"hotel_guest_managers")
                user_to_update.groups.add(group)
            elif serializer.data.role.title == "cleaner":
                group = Group.objects.get(name=f"hotel_cleaners")
                user_to_update.groups.add(group)
            elif serializer.data.role.title == "chef":
                group = Group.objects.get(name=f"hotel_chefs")
                user_to_update.groups.add(group)
            else:
                return Response({
                    "Details": "You don`t have permission to do this update"}, status=status.HTTP_403_FORBIDDEN
                )
            return Response(
                {
                    "Message": "User is updated successfully",
                    "User staff profile": serializer.data,
                    "User groups": [f"\n{group.name}\n" for group in user.groups.all()]
                }, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "Details": "You are neither admin no manager of this platform. "
                               "You don`t have permission to do this action"}, status=status.HTTP_403_FORBIDDEN
            )