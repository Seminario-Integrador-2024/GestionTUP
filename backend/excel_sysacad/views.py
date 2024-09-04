from django.db.models.manager import BaseManager
from rest_framework import serializers, status, viewsets
from rest_framework.response import Response

from .models import ExcelFile
from .serializers import ExcelFileSerializer


class ExcelFileViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[ExcelFile] = ExcelFile.objects.all()
    serializer_class = ExcelFileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            response_data = serializer.data

            if "duplicates" in serializer.context:
                response_data["duplicates"] = serializer.context["duplicates"]
                return Response(response_data, status=status.HTTP_206_PARTIAL_CONTENT)

            return Response(response_data, status=status.HTTP_201_CREATED)

        except serializers.ValidationError as exc:
            if exc.get_codes() == "invalid_excel_file":
                return Response(exc.detail, status=status.HTTP_412_PRECONDITION_FAILED)
            elif exc.get_codes() == "invalid_excel_content":
                return Response(exc.detail, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
