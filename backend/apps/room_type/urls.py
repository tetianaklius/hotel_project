from django.urls import path

from apps.room_type.views import RoomTypeListCreateView, RoomTypeUpdateView

urlpatterns = [
    path("", RoomTypeListCreateView.as_view(), name="room_type_list_create"),
    path("/<int:pk>", RoomTypeUpdateView.as_view(), name="room_type_by_id"),
]
