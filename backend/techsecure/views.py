from django.http import JsonResponse


def root(_request):
    """Raíz del backend: evita 404 en GET / y documenta enlaces útiles."""
    return JsonResponse(
        {
            "service": "TechSecure API",
            "version": "1",
            "endpoints": {
                "admin": "/admin/",
                "token_obtain": "/api/token/",
                "token_refresh": "/api/token/refresh/",
                "api": "/api/",
            },
            "frontend": "http://127.0.0.1:4200",
        }
    )
