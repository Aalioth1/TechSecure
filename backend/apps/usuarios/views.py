import logging

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Usuario
from .serializers import RegistroSerializer, UsuarioSerializer

logger = logging.getLogger("apps.usuarios")


class RegistroView(generics.CreateAPIView):
    """POST /api/usuarios/registro/ — alta de usuario (sin autenticación)."""

    queryset = Usuario.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegistroSerializer

    def create(self, request, *args, **kwargs):
        logger.info(
            "Intento de registro | IP=%s | datos=%s",
            self._client_ip(request),
            request.data,
        )
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.warning("Registro inválido: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        out = UsuarioSerializer(serializer.instance).data
        logger.info(
            "Usuario creado | id=%s | username=%s",
            serializer.instance.pk,
            serializer.instance.username,
        )
        return Response(out, status=status.HTTP_201_CREATED)

    @staticmethod
    def _client_ip(request):
        xff = request.META.get("HTTP_X_FORWARDED_FOR")
        if xff:
            return xff.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR", "")
