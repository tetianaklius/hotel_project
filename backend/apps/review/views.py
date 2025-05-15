from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.review.models import ReviewModel
from apps.review.serializers import ReviewModelSerializer
from core.checkers.profanity_checker import ProfanityChecker
from core.exceptions.profanity_check_exception import ProfanityCheckException
from core.permissions.is_a_real_guest import IsARealGuest
from core.permissions.is_admin import IsAdmin
from core.permissions.is_manager import IsManager


class ReviewCreateView(CreateAPIView):
    """
    post:
        create a review;
    """
    queryset = ReviewModel.objects.all()
    serializer_class = ReviewModelSerializer
    permission_classes = [IsARealGuest]

    # тут треба перевірити, чи є бронювання від цього імені (акаунта),
    # вибрати останнє бронювання: якщо в нього статус "завершено успішно", то дозволити залишити відгук.
    # інші випадки:
    # -- якщо нема бронювань: відповідне повідомлення;
    # -- якщо для останнього вже залишений відгук: відповідне повідомлення; не може редагувати відгук, але може
    # доповнювати в коментах
    # -- ? якщо минуло більше ніж __ днів: відповідне повідомлення;
    # -- якщо статус інший, ніж "завершено успішно" (тут подумати, чи тільки зі статусом "завершено успішно"
    # мають право лишати відгук (чи з оплатою + чекіном))
    # -- може додати плашку статусу над відгуком?

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        res = ProfanityChecker.check_profanity(self, data=serializer.validated_data)
        if res:  # data doesn`t contain profanity
            serializer.save(profanity_count=0, is_visible=True, author=user)
        else:
            serializer.save(profanity_count=1, is_visible=False, author=user)
            raise ProfanityCheckException

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ReviewRetrieveView(RetrieveAPIView):
    """
    get:
        get review by id;
    """
    queryset = ReviewModel.objects.all()
    serializer_class = ReviewModelSerializer
    http_method_names = ["get"]
    permission_classes = [IsAdmin, IsManager]


class ReviewsExtListView(ListAPIView):
    """
    get:
        get all visible reviews;
    """
    queryset = ReviewModel.objects.filter(is_visible=True)
    serializer_class = ReviewModelSerializer
    permission_classes = [IsAuthenticated]


class ReviewsIntListView(ListAPIView):
    """
    get:
        get all reviews;
    """
    queryset = ReviewModel.objects.all()
    serializer_class = ReviewModelSerializer
    permission_classes = [IsAdmin]
