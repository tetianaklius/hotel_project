


# може створювати користувач/адмін
# може переглядати користувач/адмін
# редагувати адмін (або користувач з підтвердженням адміна?)
# скасувати користувач/адмін (+1 скасування додається до id користувача; вн. інф.)


from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny

from apps.booking.models import BookingModel
from apps.booking.serializers import BookingModelSerializer, BookingUpdateModelSerializer
from core.permissions.is_admin import IsAdmin


class BookingCreateView(CreateAPIView):
    """
      post:
          create booking;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingModelSerializer
    permission_classes = [AllowAny]


class BookingListView(ListAPIView):
    """
      get:
          get all bookings;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingModelSerializer
    permission_classes = [IsAdmin]


class BookingUpdateView(UpdateAPIView):
    """
      patch:
          partial update of booking by id;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingUpdateModelSerializer
    http_method_names = ["patch"]
    permission_classes = [IsAdmin]
