from rest_framework import viewsets

from .models import ContactMessage
from .serializers import ContactSerializer
# from .pagination import (
#     ContactPagination,
#     ContactUnPagination,
# )


class ContactView(viewsets.ModelViewSet):

    queryset = ContactMessage.objects.all()
    serializer_class = ContactSerializer
    # pagination_class = ContactPagination


class ContactUnpaginateView(viewsets.ModelViewSet):

    queryset = ContactMessage.objects.all()
    serializer_class = ContactSerializer
    # pagination_class = ContactUnPagination