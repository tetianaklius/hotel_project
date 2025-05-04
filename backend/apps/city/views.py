from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.city.models import CityModel
from apps.city.serializers import CityModelSerializer
from apps.region.models import RegionModel
from core.permissions.is_admin import IsAdmin


class CityListCreateView(ListCreateAPIView):
    """
    post:
        create a city;
    get:
        get cities by region id;
    """
    queryset = CityModel.objects.all()
    serializer_class = CityModelSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs["pk"]
        queryset = CityModel.objects.filter(region_id=pk)
        return queryset

    def post(self, *args, **kwargs):
        data = self.request.data
        pk = self.kwargs["pk"]

        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        region_obj = RegionModel.objects.get(pk=pk)
        serializer.save(region=region_obj)

        return Response(serializer.validated_data, status.HTTP_201_CREATED)
