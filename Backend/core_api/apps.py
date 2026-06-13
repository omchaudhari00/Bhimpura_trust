from django.apps import AppConfig


class CoreApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_api"

    def ready(self):
        from core_api.auth import seed_hardcoded_admins

        seed_hardcoded_admins()
