# може створювати користувач/адмін
# може переглядати користувач/адмін
# редагувати адмін (або користувач з підтвердженням адміна?)
# скасувати користувач/адмін (+1 скасування додається до id користувача; вн. інф.)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from apps.booking.models import BookingModel
from apps.booking.serializers import BookingModelSerializer, BookingUpdateModelSerializer, BookingModelAdminSerializer
from apps.user.models import ProfileModel
from apps.user.serializers import ProfileModelSerializer
from core.permissions.is_admin import IsAdmin


class BookingCreateView(CreateAPIView):
    """
    post:
        create a booking;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingModelSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        filter_params = dict(booked_end_date__date__lte=kwargs["end_date"],
                             booked_start_date__date__gte=kwargs["start_date"])
        is_occupied = BookingModel.objects.filter(**filter_params, room__id=kwargs["room"]).exists()

        try:
            if is_occupied:
                return Response({
                    "Цей номер вже хтось забронював. Спробуйте змінити дати або обрати інший номер. "
                    "Або ж скористайтеся пошуком серед усіх номерів на зручний для Вас період. Для цього в основному меню (вгорі сторінки) натисніть 'забронювати'."
                    # todo
                },
                    status=status.HTTP_200_OK
                )
            else:
                # return super().post(request, *args, **kwargs)
                if IsAdmin():
                    booking_owner_id = self.request.data.get("user_profile")
                    user_profile = ProfileModel.objects.get(pk=booking_owner_id)
                    serializer = BookingModelAdminSerializer(data=request.data, user_profile=user_profile)
                else:
                    user_profile = user.profile
                    serializer = self.get_serializer(data=request.data, user_profile=user_profile)

                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except:
            return Response({"Вибачте, виникла помилка. Спробуйте ще раз, будь ласка."})


class BookingsListView(ListAPIView):
    """
    get:
        get all bookings;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingModelSerializer
    permission_classes = [IsAdmin]


class OwnBookingsListView(ListAPIView):
    """
    get:
        get own bookings;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingModelSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_bookings = BookingModel.objects.filter(user_profile__id=request.user.id)
        return Response(user_bookings.serialize(many=True), status=status.HTTP_200_OK)


class BookingUpdateView(UpdateAPIView):
    """
    patch:
        partial update of booking by id;
    get:
        get booking by id;
    """
    queryset = BookingModel.objects.all()
    serializer_class = BookingUpdateModelSerializer
    http_method_names = ["patch", "get"]
    permission_classes = [IsAdmin]
