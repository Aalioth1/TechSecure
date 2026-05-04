from django.urls import path

from .views import RegistroView

urlpatterns = [
    path("usuarios/registro/", RegistroView.as_view(), name="usuarios-registro"),
]
