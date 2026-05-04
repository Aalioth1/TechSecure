from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    """Usuario del sistema TechSecure (campos alineados al prototipo de registro)."""

    telefono = models.CharField(max_length=32, blank=True, default="")
    fecha_nacimiento = models.DateField(null=True, blank=True)

    class Rol(models.TextChoices):
        ADMIN = "admin", "Administrador"
        USUARIO = "usuario", "Usuario"

    rol = models.CharField(
        max_length=20,
        choices=Rol.choices,
        default=Rol.USUARIO,
    )

    class Meta:
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"
