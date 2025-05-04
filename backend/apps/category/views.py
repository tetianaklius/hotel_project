from rest_framework import status
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.category.models import CategoryModel
from apps.category.serializers import CategoryModelSerializer
from core.permissions.is_admin import IsAdmin


class CategoryListCreateView(ListCreateAPIView):
    """
    post:
        create a category;
    get:
        get all categories;
    """
    queryset = CategoryModel.objects.all()
    serializer_class = CategoryModelSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post", "get"]

    def post(self, request, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get the category by id;
    delete:
        delete a category by id;
    """
    queryset = CategoryModel.objects.all()
    serializer_class = CategoryModelSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get", "delete"]
