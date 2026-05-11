"""
Serializers DRF para la app usuarios.
"""

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Usuario


class RegistroSerializer(serializers.ModelSerializer):
    """Alta pública de usuario (contraseña solo escritura)."""

    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Usuario
        fields = (
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "telefono",
            "fecha_nacimiento",
        )
        extra_kwargs = {
            "email": {"required": True, "allow_blank": False},
            "telefono": {"required": False, "allow_blank": True},
            "fecha_nacimiento": {"required": False, "allow_null": True},
        }

    def validate_username(self, value: str) -> str:
        value = value.strip()
        if " " in value:
            raise serializers.ValidationError(
                "El nombre de usuario no puede contener espacios."
            )
        return value

    def validate_email(self, value: str) -> str:
        value = value.strip().lower()
        if Usuario.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "Ya existe una cuenta registrada con este correo."
            )
        return value

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        return Usuario.objects.create_user(
            username,
            email=email,
            password=password,
            **validated_data,
        )


class UsuarioSerializer(serializers.ModelSerializer):
    """Representación básica de usuario (sin contraseña)."""

    class Meta:
        model = Usuario
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "telefono",
            "fecha_nacimiento",
            "rol",
            "is_active",
            "date_joined",
        )
        read_only_fields = ("id", "rol", "date_joined")
