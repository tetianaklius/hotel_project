from django.urls import path

from apps.review.views import ReviewsExtListView, ReviewsIntListView, ReviewCreateView

urlpatterns = [
    path("", ReviewsExtListView.as_view(), name="get_all_reviews_for_user"),
    path("/internal", ReviewsIntListView.as_view(), name="get_all_reviews_for_admin"),
    path("/new", ReviewCreateView.as_view(), name="review_create"),
]