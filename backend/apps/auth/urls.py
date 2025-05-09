from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", TokenObtainPairView.as_view(), name="auth_login"),
    path("", TokenRefreshView.as_view(), name="auth_refresh"),
]
