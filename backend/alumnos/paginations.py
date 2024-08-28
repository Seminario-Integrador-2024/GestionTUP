from rest_framework.pagination import LimitOffsetPagination

class AlumnoResultsSetPagination(LimitOffsetPagination):
    default_limit = 50 
    limit_query_param = 'limit'  
    offset_query_param = 'offset'
    max_limit = 100
