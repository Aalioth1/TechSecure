from rest_framework_simplejwt.views import TokenObtainPairView

from .jwt_serializers import TechSecureTokenObtainPairSerializer


class TechSecureTokenObtainPairView(TokenObtainPairView):
    serializer_class = TechSecureTokenObtainPairSerializer
