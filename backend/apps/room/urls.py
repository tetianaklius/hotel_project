from django.urls import path

from apps.room.views import RoomCreateAPIView, RoomsExtListView, RoomsIntListView, RoomExtRetrieveAPIView, \
    RoomRetrieveUpdateDestroyAPIView

urlpatterns = [
    path("", RoomsExtListView.as_view(), name="room_list_for_user"),
    path("/internal", RoomsIntListView.as_view(), name="room_list_for_admin"),
    path("/create", RoomCreateAPIView.as_view(), name="room_create"),
    path("/<int:pk>", RoomExtRetrieveAPIView.as_view(), name="room_by_id_for_user"),
    path("/<int:pk>/internal", RoomRetrieveUpdateDestroyAPIView.as_view(), name="room_by_id_for_admin"),
]