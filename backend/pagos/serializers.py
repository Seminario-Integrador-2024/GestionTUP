from rest_framework import serializers
from .models import *
from django.urls import reverse

# Create your serializers here.

class CompromisoDePagoSerializer(serializers.ModelSerializer):
    archivo_pdf = serializers.FileField(write_only=True, required=False, allow_null=True)
    archivo_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = CompromisoDePago
        exclude = ['comprimiso_path']

    def get_archivo_pdf_url(self, obj):
        request = self.context.get('request')
        if obj.archivo_pdf:
            # Genera la URL completa al archivo PDF
            url = reverse('compromisodepago-retrieve-pdf', args=[obj.pk])
            if request is not None:
                return request.build_absolute_uri(url)
            else:
                return url
        return None

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"


class CuotaSerializer(serializers.ModelSerializer):
    
    monto = serializers.SerializerMethodField()

    class Meta:
        model = Cuota
        fields = "__all__"
        
    def get_monto(self, obj):
        compromiso_de_pago = obj.compdepago
        if compromiso_de_pago:
            return compromiso_de_pago.monto_completo
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('compdepago', None)
        return representation
        

class FirmaCompPagoAlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirmaCompPagoAlumno
        fields = "__all__"
