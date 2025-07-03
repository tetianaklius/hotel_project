from django.urls import path

from apps.booking.views import BookingCreateView, BookingUpdateView, BookingsListView, OwnBookingsListView

urlpatterns = [
    path("/admin", BookingsListView.as_view(), name="bookings_list"),
    path("/new", BookingCreateView.as_view(), name="booking_create"),
    path("/my_bookings", OwnBookingsListView.as_view(), name="own_bookings"),
    path("/<int:pk>", BookingUpdateView.as_view(), name="booking_update")
]
