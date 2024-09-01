
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

from alumnos.models import Alumno

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


class CompromisoDePago(models.Model):
    """
    Represents a payment commitment.

    Args:
        models (type): The Django models module.

    Attributes:
        id_comp_pago (AutoField): The primary key for the payment commitment.
        cuatrimestre (CharField): The academic period (e.g., semester or quarter) \
            for which the payment commitment is made.
        anio (DateTimeField): The year related to the payment commitment.
        monto_completo (FloatField): The full amount of the payment commitment.
        monto_completo_2venc (FloatField): The amount to be paid if payment is  \
            made by the second due date.
        monto_completo_3venc (FloatField): The amount to be paid if payment is 
            made by the third due date.
        matricula (FloatField): The amount of the registration fee for the commitment.
        cuota_reducida (FloatField): The reduced amount of the payment commitment.
        cuota_reducida_2venc (FloatField): The reduced amount to be paid if payment
            is made by the second due date.
        cuota_reducida_3venc (FloatField): The reduced amount to be paid if payment 
            is made by the third due date.
        comprimiso_path (CharField): The file path to the saved commitment
          document (PDF).
        archivo_pdf (FileField): The uploaded PDF file of the payment commitment.
        fecha_ultima_modif (DateTimeField): The date and time when the payment
          commitment was last modified.
        fecha_carga_comp_pdf (DateTimeField): The date and time when the PDF of the \
            payment commitment was uploaded, automatically set when the record 
            is created.
    """

    id_comp_pago = models.AutoField(primary_key=True)
    cuatrimestre = models.CharField(max_length=255, blank=True,  null=True)
    anio = models.DateTimeField(max_length=10,  blank=True,  null=True)
    monto_completo = models.FloatField( blank=True,  null=True)
    monto_completo_2venc = models.FloatField( blank=True,  null=True)
    monto_completo_3venc = models.FloatField( blank=True,  null=True)
    matricula = models.FloatField( blank=True,  null=True)
    cuota_reducida = models.FloatField( blank=True,  null=True)
    cuota_reducida_2venc = models.FloatField( blank=True,  null=True)
    cuota_reducida_3venc = models.FloatField( blank=True,  null=True)
    comprimiso_path = models.CharField(max_length=255, blank=True, null=True)
    archivo_pdf = models.FileField(upload_to='compromisos/', blank=True,  null=True)
    fecha_ultima_modif = models.DateTimeField(max_length=10,  blank=True,  null=True)
    fecha_carga_comp_pdf = models.DateTimeField(max_length=10, auto_now_add=True, blank=True,  null=True)

    def save(self, *args, **kwargs):

        try:
            old_instance = CompromisoDePago.objects.get(pk=self.pk)
            old_file = old_instance.archivo_pdf
        except CompromisoDePago.DoesNotExist:
            old_file = None

        if old_file and self.archivo_pdf != old_file:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)

        self.fecha_ultima_modif = timezone.now()
        super().save(*args, **kwargs)

        if self.archivo_pdf:
            self.comprimiso_path = self.archivo_pdf.url
            super().save(update_fields=['comprimiso_path'])


@receiver(post_delete, sender=CompromisoDePago)
def auto_delete_file_on_delete(sender, instance, **kwargs):

    if instance.archivo_pdf and os.path.isfile(instance.archivo_pdf.path):
        os.remove(instance.archivo_pdf.path)

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
    compdepago =  models.ForeignKey(CompromisoDePago, on_delete=models.CASCADE)
    estado = models.CharField(max_length=255)
    vencimiento = models.DateField()
    fecha_pago = models.DateField()
    fecha_vencimiento = models.DateField()
    fecha_pago_devengado = models.DateField()
    fecha_pedido = models.DateField()
    tipo_puesto = models.CharField(max_length=255)


class LineaDePago(models.Model):
    """
    Represents the relationship between a payment and an installment.
    Allows partial payments of installments and payments applied to multiple installments.

    Args:
        models (type): The Django models module.

    Attributes:
        id_linea_pago (AutoField): The primary key for the LineaDePago.
        pago (ForeignKey): The foreign key to the associated payment.
        cuota (ForeignKey): The foreign key to the associated installment.
        monto_aplicado (FloatField): The amount of the payment applied to this installment.
    """

    id_linea_pago = models.AutoField(primary_key=True)
    pago = models.ForeignKey(Pago, on_delete=models.CASCADE)
    cuota = models.ForeignKey(Cuota, on_delete=models.CASCADE)
    monto_aplicado = models.FloatField()


class FirmaCompPagoAlumno(models.Model):
    """
    Represents the relationship between an Alumno and a CompromisoDePago,
    allowing to store additional information about the payment.

    Args:
        models (type): The Django models module.

    Attributes:
        alumno (ForeignKey): The related Alumno.
        compromiso_de_pago (ForeignKey): The related CompromisoDePago.
        fecha_pago (DateTimeField): The date and time when the payment was made.
        firmado BooleanField(): The confirmation of having signed  
    """

    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    compromiso_de_pago = models.ForeignKey(CompromisoDePago, on_delete=models.CASCADE)
    fecha_firmado = models.DateTimeField(auto_now_add=True, blank=True,  null=True )
    firmado = models.BooleanField(default=True, blank=True,  null=True)
