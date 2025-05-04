from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from apps.review.models import ReviewModel
from apps.review.serializers import ReviewModelSerializer
from core.permissions.is_a_real_guest import IsARealGuest
from core.permissions.is_admin import IsAdmin


class ReviewCreateView(CreateAPIView):
    """
    post:
        create a review;
    """
    queryset = ReviewModel.objects.all()
    serializer_class = ReviewModelSerializer
    permission_classes = [IsARealGuest]  # тут треба перевірити, чи є бронювання від цього імені (акаунта),
    # вибрати останнє бронювання: якщо в нього статус "відбулося", то дозволити залишити відгук.
    # інші випадки: якщо нема бронювань: відповідне повідомлення;
    # якщо для останнього вже залишений відгук: відповідне повідомлення;
    # якщо статус інший
    # (тут подумати, чи тільки зі статусом відбулося мають право лишати (чи з оплатою + чекіном))


class ReviewsExtListView(ListAPIView):
    """
    get:
        get all visible review;
    """
    queryset = ReviewModel.objects.filter(is_visible=True)
    serializer_class = ReviewModelSerializer
    permission_classes = [IsAuthenticated]


class ReviewsIntListView(ListAPIView):
    """
    get:
        get all review;
    """
    queryset = ReviewModel.objects.all()
    serializer_class = ReviewModelSerializer
    permission_classes = [IsAdmin]
