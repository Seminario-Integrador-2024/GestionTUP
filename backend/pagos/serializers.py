from rest_framework import serializers
from .models import *


# Create your serializers here.

class CompromisoDePagoSerializer(serializers.ModelSerializer):
    archivo_pdf = serializers.FileField(write_only=True, required=False)
    class Meta:
        model = CompromisoDePago
        fields = "__all__"



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
        

