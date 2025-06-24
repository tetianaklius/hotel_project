REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        # 'rest_framework.renderers.BrowsableAPIRenderer',
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "core.permissions.IsSuperUser",
    ],
    "EXCEPTION_HANDLER": "core.handlers.error_handler.error_handler",
    "DEFAULT_FILTER_BACKENDS": (
        "django_filters.rest_framework.DjangoFilterBackend",
    ),
}
AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
)
