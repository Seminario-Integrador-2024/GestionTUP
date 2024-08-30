import pandas as pd
from rest_framework import status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from yaml import serialize

from .serializers import ExcelDataSerializer


class ExcelApiView(APIView):
    parser_classes = [FileUploadParser]
    serializer_class = ExcelDataSerializer

    def post(self, request, *args, **kwargs):
        file_obj = request.data["file"]

        # Validate if Excel file
        if not file_obj.name.endswith(".xlsx") or not file_obj.name.endswith(".xls"):
            return Response(
                {"error": "Invalid file type"}, status=status.HTTP_400_BAD_REQUEST
            )

        df = pd.read_excel(file_obj)

        # Validate formatting
        if not self.validate_formatting(df):
            return Response(
                {"error": "Invalid formatting"},
                status=status.HTTP_412_PRECONDITION_FAILED,
            )
        serializer = ExcelDataSerializer(data=df.to_dict(orient="records"), many=True)

        if serializer.is_valid():
            added_rows = 0
            not_added_rows = []
            for row in serializer.validated_data:
                try:
                    # Try to create instance (assuming validate_formatting ensures correct data)
                    MyModel.objects.create(**row)
                    added_rows += 1
                except IntegrityError:
                    not_added_rows.append(row)
            if not_added_rows:
                return Response(
                    {"not_added_rows": not_added_rows},
                    status=status.HTTP_206_PARTIAL_CONTENT,
                )
            return Response(
                {"total_rows_processed": added_rows}, status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors, status=status.HTTP_412_PRECONDITION_FAILED
            )

    def validate_formatting(self, df):
        # Custom formatting validation logic here
        # For example:
        expected_columns = ["column1", "column2", "column3"]
        return set(df.columns) == set(expected_columns)
