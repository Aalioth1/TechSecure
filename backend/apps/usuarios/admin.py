from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(DjangoUserAdmin):
    list_display = ("username", "email", "first_name", "last_name", "rol", "is_staff")
    list_filter = ("rol", "is_staff", "is_superuser")
    fieldsets = DjangoUserAdmin.fieldsets + (
        ("TechSecure", {"fields": ("telefono", "fecha_nacimiento", "rol")}),
    )
    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ("TechSecure", {"fields": ("telefono", "fecha_nacimiento", "rol")}),
    )
