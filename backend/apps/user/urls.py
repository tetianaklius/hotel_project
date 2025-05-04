from django.urls import path

from apps.user.views import UserCreateView, UsersListView, UserRetrieveUpdateDestroyAPIView, GetOwnProfileView, \
    BlockUserView, UnblockUserView, UserToStaffView

urlpatterns = [
    path("", UsersListView.as_view(), name="users_list"),
    path("/create", UserCreateView.as_view(), name="user_create"),
    path("/<int:pk>", UserRetrieveUpdateDestroyAPIView.as_view(), name="user_by_id"),
    path("/<int:pk>/block", BlockUserView.as_view(), name="user_block"),
    path("/<int:pk>/unblock", UnblockUserView.as_view(), name="user_unblock"),
    path("/<int:pk>/to_staff", UserToStaffView.as_view(), name="user_to_staff"),
    path("/my_profile", GetOwnProfileView.as_view(), name="user_profile"),

]