from alumnos.models import Alumno
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

    # id_materia = models.AutoField(primary_key=True)
    codigo_materia = models.IntegerField(primary_key=True)
    anio_cursada = models.PositiveSmallIntegerField()
    anio_plan = models.PositiveSmallIntegerField()
    nombre = models.CharField(max_length=255)
    cuatrimestre = models.PositiveSmallIntegerField()


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
    anio = models.IntegerField()
    offrc = models.IntegerField()
    atendnc = models.IntegerField()

    class Meta:
        """
        This class provides metadata options for the model.
        """

        unique_together: tuple[tuple[str, str, str]] = (
            ("id_materia", "id_alumno", "anio"),
        )
