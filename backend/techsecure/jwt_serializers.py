"""
Serializador JWT: expone is_staff en el cuerpo de la respuesta y en el token.
"""

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TechSecureTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Incluye is_staff para que el front distinga acceso al panel Angular admin."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["is_staff"] = bool(user.is_staff)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["is_staff"] = bool(self.user.is_staff)
        data["groups"] = list(self.user.groups.values_list("name", flat=True))
        return data
