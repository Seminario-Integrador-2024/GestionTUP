import os

import django
from django.core.exceptions import AppRegistryNotReady

# Establece la configuración de Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings.base")
django.setup()

# Verifica si Django está completamente configurado
try:
    from users.models import GenericUser
except AppRegistryNotReady:
    print("Django no está completamente configurado.")
    exit(1)

# Código para crear el superusuario
if not GenericUser.objects.filter(username="admin").exists():
    GenericUser.objects.create_superuser(
        username="admin", email="admin@example.com", password="1234"
    )
    print("Superusuario creado exitosamente")
else:
    print("El superusuario ya existe")
