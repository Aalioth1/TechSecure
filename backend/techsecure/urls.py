from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

from .jwt_views import TechSecureTokenObtainPairView
from .views import root

urlpatterns = [
    path("", root, name="root"),
    path("admin/", admin.site.urls),
    path(
        "api/token/",
        TechSecureTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("apps.usuarios.urls")),
]
