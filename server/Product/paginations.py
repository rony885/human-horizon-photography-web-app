from django.conf import settings
from rest_framework import pagination, status
from rest_framework.response import Response


class CategoryPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500
    page_query_param = 'p'

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'data_per_page': self.page.paginator.per_page,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        }, status=status.HTTP_200_OK)


class YearPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500
    page_query_param = 'p'

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'data_per_page': self.page.paginator.per_page,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        }, status=status.HTTP_200_OK)


class ProductPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500
    page_query_param = 'p'

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'data_per_page': self.page.paginator.per_page,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        }, status=status.HTTP_200_OK)
