# model_administrador.py

# django imports
from django.conf import settings
from django.db import models
from users.models import GenericUser


class Administrador(GenericUser):
    """
    Represents an administrator.

    Args:
        models (type): The Django models module.

    Attributes:
        user (OneToOneField): The user associated with the administrator.
        dni (IntegerField): The DNI (Documento Nacional de Identidad)\
            of the administrator.
    """

    # dni = models.IntegerField()


class Rol(models.Model):
    """
    Represents a role in the system.

    Attributes:
        id_rol (AutoField): The primary key for the role.
        nombre (CharField): The name of the role.
        descripcion (TextField): The description of the role.
    """

    id_rol = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()


class Permisos(models.Model):
    """
    Permisos model represents the permissions available in the system.

    Args:
        models (type): The base class for all Django models.

    Attributes:
        id_permiso (AutoField): The primary key for the permission.
        nombre (CharField): The name of the permission.
        descripcion (TextField): The description of the permission.
    """

    id_permiso = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()


class AdminRol(models.Model):
    """
    Represents the relationship between an administrator and a role.

    Args:
        models (type): The Django models module.

    Attributes:
        id_admin (ForeignKey): The foreign key to the Administrador model.
        id_rol (ForeignKey): The foreign key to the Rol model.

    Meta:
        unique_together (tuple): Specifies that the combination of \
            id_admin and id_rol should be unique.
    """

    id_admin = models.ForeignKey(Administrador, on_delete=models.CASCADE)
    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    class Meta:
        unique_together: tuple[tuple[str, str]] = (("id_admin", "id_rol"),)


class RolPermiso(models.Model):
    """
    Represents the relationship between a role and a permission.

    Args:
        models (type): The Django models module.

    Attributes:
        id_rol (ForeignKey): The foreign key to the Rol model.
        id_permiso (ForeignKey): The foreign key to the Permisos model.

    Meta:
        unique_together (tuple[tuple[str, str]]): Specifies that\
            the combination of id_rol and id_permiso should be unique.
    """

    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    id_permiso = models.ForeignKey(Permisos, on_delete=models.CASCADE)

    class Meta:
        unique_together: tuple[tuple[str, str]] = (("id_rol", "id_permiso"),)
