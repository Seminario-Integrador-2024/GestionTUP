# core/models.py

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


class CompromisoDePago(models.Model):
    """
    Represents a payment commitment.

    Args:
        models (type): The Django models module.

    Attributes:
        id_comp_pago (AutoField): The primary key for the payment commitment.
        perfciclo (DateTimeField): The date and time of the payment commitment.
        monto (FloatField): The amount of the payment commitment.
        firmado (BooleanField): Indicates if \
            the payment commitment has been signed.
        fecha_firmado (DateTimeField): The date and time when \
            the payment commitment was signed.
        compromiso (CharField): The description of the payment commitment.
        alumno (ForeignKey): The foreign key to \
            the related Alumno (student) model.
    """

    id_comp_pago = models.AutoField(primary_key=True)
    perfciclo = models.DateTimeField()
    monto = models.FloatField()
    firmado = models.BooleanField()
    fecha_firmado = models.DateTimeField()
    compromiso = models.CharField(max_length=255)
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)


class Pago(models.Model):
    """
    Represents a payment made by a student.

    Args:
        models (type): The Django models module.

    Attributes:
        id_pago (AutoField): The primary key for the payment.
        descripcion (TextField): The description of the payment.
        medio_pago (CharField): The payment method used.
        nro_recibo (IntegerField): The receipt number of the payment.
        monto (FloatField): The amount of the payment.
        estado (BooleanField): The status of the payment.
        fecha (DateField): The date of the payment.
        comprobante (CharField): The payment receipt or proof.
        alumno (ForeignKey): The foreign key to the associated student.
        cuota (ForeignKey): The foreign key to the associated installment.
    """

    id_pago = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    medio_pago = models.CharField(max_length=255)
    nro_recibo = models.IntegerField()
    monto = models.FloatField()
    estado = models.BooleanField()
    fecha = models.DateField()
    comprobante = models.CharField(max_length=255)
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    cuota = models.ForeignKey("Cuota", on_delete=models.CASCADE)


class Cuota(models.Model):
    """
    Represents a Cuota.

    Args:
        models (type): The Django models module.

    Attributes:
        id_cuota (AutoField): The primary key for the Cuota.
        nro_cuota (IntegerField): The number of the Cuota.
        recargo (FloatField): The recargo of the Cuota.
        monto (FloatField): The monto of the Cuota.
        firmado (BooleanField): Indicates if the Cuota has been firmado.
        vencimiento (DateField): The vencimiento date of the Cuota.
        fecha_pago (DateField): The fecha_pago date of the Cuota.
        fecha_vencimiento (DateField): The fecha_vencimiento date of the Cuota.
        fecha_pago_devengado (DateField): The fecha_pago_devengado date of \
            the Cuota.
        fecha_pedido (DateField): The fecha_pedido date of the Cuota.
        tipo_puesto (CharField): The tipo_puesto of the Cuota.
    """

    id_cuota = models.AutoField(primary_key=True)
    nro_cuota = models.IntegerField()
    recargo = models.FloatField()
    monto = models.FloatField()
    firmado = models.BooleanField()
    vencimiento = models.DateField()
    fecha_pago = models.DateField()
    fecha_vencimiento = models.DateField()
    fecha_pago_devengado = models.DateField()
    fecha_pedido = models.DateField()
    tipo_puesto = models.CharField(max_length=255)


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


class Administrador(models.Model):
    """
    Represents an administrator.

    Args:
        models (type): The Django models module.

    Attributes:
        user (OneToOneField): The user associated with the administrator.
        dni (IntegerField): The DNI (Documento Nacional de Identidad)\
            of the administrator.
    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    dni = models.IntegerField()


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
