from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from apps.room.filters import RoomsIntFilter, RoomsExtFilter
from apps.room.models import RoomModel
from apps.room.serializers import RoomModelSerializer
from core.permissions.is_admin import IsAdmin


class RoomCreateAPIView(CreateAPIView):
    """
    create:
        create a room;
    """
    queryset = RoomModel.objects.all()
    serializer_class = RoomModelSerializer
    permission_classes = [AllowAny]


class RoomsExtListView(ListAPIView):
    """
    get:
        get all visible rooms;
    """
    queryset = RoomModel.objects.filter(is_visible=True)
    serializer_class = RoomModelSerializer
    permission_classes = [AllowAny]
    filterset_class = RoomsExtFilter


class RoomsIntListView(ListAPIView):
    """
    get:
        get all rooms;
    """
    queryset = RoomModel.objects.all()
    serializer_class = RoomModelSerializer
    permission_classes = [IsAdmin]
    filterset_class = RoomsIntFilter


class RoomExtRetrieveAPIView(RetrieveAPIView):
    """
    get:
        get room by id (only visible rooms);
    """
    queryset = RoomModel.objects.filter(is_visible=True)
    serializer_class = RoomModelSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get"]


class RoomRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get room by id;
    patch:
        update room by id;
    delete:
        delete room by id;
    """
    queryset = RoomModel.objects.all()
    serializer_class = RoomModelSerializer
    permission_classes = [IsAdmin]
    http_method_names = ["patch", "delete"]
