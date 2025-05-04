from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.room_type.models import RoomTypeModel
from apps.room_type.serializers import RoomTypeModelSerializer


class RoomTypeListCreateView(ListCreateAPIView):
    """
    post:
        create room type;
    get:
        get all room types;
    """
    queryset = RoomTypeModel.objects.all()
    serializer_class = RoomTypeModelSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)


class RoomTypeUpdateView(RetrieveUpdateAPIView):
    """
    get:
        get room type by id;
    patch:
        update room type;
    """

    queryset = RoomTypeModel.objects.all()
    serializer_class = RoomTypeModelSerializer
    http_method_names = ["get", "patch"]
    permission_classes = [AllowAny]


