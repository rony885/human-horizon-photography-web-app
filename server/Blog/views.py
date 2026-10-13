
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Blog
from .serializers import BlogSerializer, UnpaginateBlogSerializer
# from .paginations import BlogPagination


class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    # pagination_class = BlogPagination


class BlogUnpaginateView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = UnpaginateBlogSerializer
