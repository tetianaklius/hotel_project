from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from rest_framework.response import Response

from apps.staff_role.models import StaffRoleModel
from apps.staff_role.serializers import StaffRoleModelSerializer
from core.permissions.is_admin import IsAdmin


class StaffRoleListCreateAPIView(ListCreateAPIView):
    """
    post:
        create new staff role;
    """

    queryset = StaffRoleModel.objects.all()
    serializer_class = StaffRoleModelSerializer
    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)