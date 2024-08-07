from django.apps import AppConfig


class ApiConfig(AppConfig):
    """
    This class is used to configure the api app.
    :param AppConfig: This class is used to configure the api app.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
