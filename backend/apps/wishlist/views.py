from rest_framework import status
from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.wishlist.models import WishlistModel
from apps.wishlist.serializers import WishlistModelSerializer


class WishlistUpdateView(UpdateAPIView):
    """
    put:
        update an own wishlist (add or remove rooms from user`s wishlist);
    """

    queryset = WishlistModel.objects.all()
    serializer_class = WishlistModelSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            roomsPag = request.data.get("roomsPag")
            rooms = roomsPag.results
            user = request.user
            wishlist = WishlistModel.objects.get_or_create(user=request.user)
            serializer = WishlistModelSerializer(wishlist, rooms=rooms, user=user)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # wishlist.rooms.set(rooms)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except:
            return Response({"message": "Hey, something went wrong"}, status=status.HTTP_400_BAD_REQUEST)  # todo

    # def post(self, request, *args, **kwargs):
    #     try:
    #         room = RoomModel.objects.get(id=args["room_id"])
    #     except:
    #         return Response({"message": "Room is not found"}, status=status.HTTP_404_NOT_FOUND)
    #     wishlist = WishlistModel.objects.get_or_create(user=request.user)
    #     return Response(serializer.validated_data, status=status.HTTP_201_CREATED)


class WishlistRetrieveView(RetrieveAPIView):
    """
    get:
        get own wishlist;
    """

    queryset = WishlistModel.objects.all()
    serializer_class = WishlistModelSerializer
    permission_classes = [IsAuthenticated]