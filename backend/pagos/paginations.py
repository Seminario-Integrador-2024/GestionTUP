from rest_framework.pagination import LimitOffsetPagination

class CompDePagResultsSetPagination(LimitOffsetPagination):
    default_limit = 10
    limit_query_param = 'limit'  
    offset_query_param = 'offset'
    max_limit = 100
