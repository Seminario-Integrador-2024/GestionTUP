from rest_framework import serializers


class ExcelDataSerializer(serializers.Serializer):
    # Define fields to match Excel columns
    column1 = serializers.CharField(max_length=100)
    column2 = serializers.IntegerField()

    def validate(self, data):
        # Custom validation logic here
        return data
