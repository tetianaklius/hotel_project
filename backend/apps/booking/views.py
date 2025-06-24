


# може створювати користувач/адмін
# може переглядати користувач/адмін
# редагувати адмін (або користувач з підтвердженням адміна?)
# скасувати користувач/адмін (+1 скасування додається до id користувача; вн. інф.)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

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
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request, *args, **kwargs):

        filter_params = dict(booked_end_date__date__lte=kwargs["end_date"],
                             booked_start_date__date__gte=kwargs["start_date"])
        is_occupied = BookingModel.objects.filter(**filter_params, room__id=kwargs["room"]).exists()

        # try:  # todo
        if is_occupied:
            return Response({
                "Цей номер вже хтось забронював. Спробуйте змінити дати або обрати інший номер. "
                "Або ж скористайтеся пошуком серед усіх номерів на зручний для Вас період. Для цього в основному меню (вгорі сторінки) натисніть 'забронювати'."  # todo
            },
            status=status.HTTP_200_OK
            )
        else:
            return super().post(request, *args, **kwargs)



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
