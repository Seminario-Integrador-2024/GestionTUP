# core/models/modelo_alumno.py

# django imports
from django.conf import settings
from django.db import models


# Create your models here.
class Materia(models.Model):
    """
    Represents a subject or course.

    Args:
        models (type): The Django models module.

    Attributes:
        id_materia (AutoField): The primary key for the Materia model.
        nombre (CharField): The name of the subject.
        cuatrimestre (PositiveSmallIntegerField): The semester in which\
            the subject is offered.
    """

    id_materia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    cuatrimestre = models.PositiveSmallIntegerField()


class Alumno(models.Model):
    """
    Represents a student.

    Args:
        models (type): The Django models module.

    Attributes:
        user (CustomUser): The associated user object.
        legajo (int): The student's identification number.
        dni (int): The student's national identification number.
        estado (TipoEstado): The student's current state.

    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    legajo = models.IntegerField()
    dni = models.IntegerField()
    estado = models.ForeignKey("TipoEstado", on_delete=models.CASCADE)


class MateriaAlumno(models.Model):
    """
    Represents the relationship between a Materia and an Alumno.

    Args:
        models (type): The Django models module.

    Attributes:
        id_materia (ForeignKey): The foreign key to the Materia model.
        id_alumno (ForeignKey): The foreign key to the Alumno model.
        offrc (IntegerField): The number of times the Materia has been offered.
        atendnc (IntegerField): The number of times \
            the Alumno has attended the Materia.

    Meta:
        unique_together (tuple): Specifies that the combination of \
            id_materia and id_alumno should be unique.
    """

    id_materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    id_alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    offrc = models.IntegerField()
    atendnc = models.IntegerField()

    class Meta:
        """
        This class provides metadata options for the model.
        """

        unique_together: tuple[tuple[str, str]] = (("id_materia", "id_alumno"),)


class Inhabilitacion(models.Model):
    """
    Represents an Inhabilitacion.

    Args:
        models (type): The Django models module.

    Attributes:
        id_alumno (ForeignKey): The foreign key to the Alumno model.
        id_tipo_inhabilitacion (ForeignKey): The foreign key to \
            the TipoInhabilitacion model.
        fecha_desde (DateTimeField): The starting date and time of \
            the inhabilitacion.
        fecha_hasta (DateTimeField): The ending date and time of \
            the inhabilitacion.
        descripcion (TextField): The description of the inhabilitacion.
    """

    id_alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    id_tipo_inhabilitacion = models.ForeignKey(
        "TipoInhabilitacion", on_delete=models.CASCADE
    )
    fecha_desde = models.DateTimeField()
    fecha_hasta = models.DateTimeField()
    descripcion = models.TextField()


class TipoInhabilitacion(models.Model):
    """
    TipoInhabilitacion represents a type of disqualification.

    Args:
        models (django.db.models.Model): The base model class for \
            all Django models.
    """

    id_tipo_inhabilitacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

class TipoEstado(models.Model):
    """
    Represents a type of state.

    Attributes:
        id_tipo_estado (AutoField): The primary key for \
            the TipoEstado instance.
        nombre (CharField): The name of the TipoEstado.
        descripcion (TextField): The description of the TipoEstado.
    """

    id_tipo_estado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

