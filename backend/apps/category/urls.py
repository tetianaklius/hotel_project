from django.urls import path

from apps.category.views import CategoryListCreateView, RetrieveUpdateDestroyView

urlpatterns = [
    path("", CategoryListCreateView.as_view(), name="category_list_create"),
    path("/<int:pk>", RetrieveUpdateDestroyView.as_view(), name="category_by_id"),
]
