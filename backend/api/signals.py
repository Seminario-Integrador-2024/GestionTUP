# api/signals.py

from django.db.models.signals import post_save
from drf_spectacular.utils import extend_schema
from django.dispatch import receiver
from django.http import HttpRequest
from drf_spectacular.utils import extend_schema


@receiver(post_save)
def generate_schema_on_request(sender, instance=None, created=False, **kwargs) -> None:
    """
    :param sender: The sender of the signal.
    :param instance: The instance of the sender.
    :param created: A boolean indicating if the instance was created.
    :param kwargs: Additional keyword arguments.
    :return: None
    :raises: No exceptions raised.
    """
    if not isinstance(instance, HttpRequest):
        return  # Ignore non-request signals

    # Check if URL matches schema or swagger UI endpoints
    if instance.path.startswith("/schema") or instance.path.startswith("/swagger"):
        pass  # Schema already generated
