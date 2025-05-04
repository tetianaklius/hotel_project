from django.urls import path

from apps.booking.views import BookingCreateView, BookingListView, BookingUpdateView

urlpatterns = [
    path("", BookingListView.as_view(), name="bookings_list"),
    path("/new", BookingCreateView.as_view(), name="booking_create"),
    path("/<int:pk>", BookingUpdateView.as_view(), name="booking_update")
]
