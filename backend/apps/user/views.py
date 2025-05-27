from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.city.models import CityModel
from apps.user.filters import UsersFilter
from apps.user.models import ProfileModel
from apps.user.serializers import UserModelSerializer, ProfileModelSerializer, OwnProfileSerializer
from core.pagination.pagination import CustomPagePagination
from core.permissions.is_admin import IsAdmin

UserModel = get_user_model()


class UserCreateView(GenericAPIView):
    """
    post:
        create a user;
    """
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        data = self.request.data
        context_ = {}

        if "city" in data["profile"]:
            city_obj = get_object_or_404(CityModel, value=data["profile"]["city"])
            context_["city"] = city_obj

        serializer = UserModelSerializer(data=data, context=context_)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status.HTTP_201_CREATED)


class UsersListView(ListAPIView):
    """
    get:
        get all users;
    """
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = CustomPagePagination
    permission_classes = [AllowAny]
    filterset_class = UsersFilter

    def get(self, request, *args, **kwargs):
        if request.query_params.get("email"):
            searched_email = request.query_params.get("email")
            user = UserModel.objects.filter(email=searched_email).first()
            if user:
                return Response(UserModelSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        if request.query_params.get("surname"):
            searched_surname = request.query_params.get("surname")
            user = UserModel.objects.filter(surname=searched_surname).first()
            if user:
                return Response(UserModelSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        return super().get(request, *args, **kwargs)


class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get user by id;
    patch:
        partial update user profile by id;
    delete:
        delete user by id;
    """
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]  # todo тут треба дописати права для адміна
    http_method_names = ["get", "patch", "delete"]

    def patch(self, *args, **kwargs):
        user = self.request.user
        data = self.request.data
        user_to_update = self.get_object()

        if user.is_authenticated and user.id == user_to_update.id:  # todo
            try:
                profile = ProfileModel.objects.get(user=user_to_update)
            except ProfileModel.DoesNotExist:
                return Response({"details": "Not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = ProfileModelSerializer(profile, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    "Message": "You can edit only your personal account.",
                },
                status.HTTP_403_FORBIDDEN
            )

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user_to_delete = self.get_object()
        if user.is_authenticated and user.id == user_to_delete.id:  # todo чи треба перевіряти ще раз
            user_to_delete.delete()    # todo архівувати дані чи зробити користувача неактивним
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {
                "Message": "You can delete only your personal account.",
            },
            status.HTTP_403_FORBIDDEN
        )


# class UserToStaffView(GenericAPIView):
#     """
#     patch:
#         update user staff status to true;
#     """
#     queryset = UserModel.objects.all()
#     serializer_class = UserModelSerializer
#     permission_classes = [IsAdmin]
#     http_method_names = ["patch"]
#
#     def patch(self, *args, **kwargs):
#         user = self.get_object()
#         user.is_staff = True
#         user.save()
#         return Response(status=status.HTTP_200_OK)


class BlockUserView(GenericAPIView):
    """
    patch:
        block user by id; user become inactive (is_active=False);
    """
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_active:
            user.is_active = False
            user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UnblockUserView(GenericAPIView):
    """
    patch:
        unblock user by id; user become active (is_active=True);
    """
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetOwnProfileView(GenericAPIView):
    """
    get:
        get own user profile;
    """
    permission_classes = [IsAuthenticated]

    def get(self, *args, **kwargs):
        user = UserModel.objects.get(id=self.request.user.id)
        serializer = OwnProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)