"""
URL configuration for configs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include

urlpatterns = [
    path("api/auth", include("apps.auth.urls")),
    path("api/users", include("apps.user.urls")),
    path("api/bookings", include("apps.booking.urls")),
    path("api/categories", include("apps.category.urls")),
    path("api/cities", include("apps.city.urls")),
    path("api/regions", include("apps.region.urls")),
    path("api/reviews", include("apps.review.urls")),
    path("api/rooms", include("apps.room.urls")),
    path("api/room_types", include("apps.room_type.urls")),
]
