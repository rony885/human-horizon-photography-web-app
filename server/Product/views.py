from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Category, Year, License, Product
from .serializers import CategorySerializer, UnpaginateCategorySerializer, YearSerializer, UnpaginateYearSerializer, LicenseSerializer, UnpaginateLicenseSerializer, ProductSerializer, UnpaginateProductSerializer
from .paginations import CategoryPagination, YearPagination,  ProductPagination


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # pagination_class = CategoryPagination


class CategoryUnpaginateView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = UnpaginateCategorySerializer


class YearView(viewsets.ModelViewSet):
    queryset = Year.objects.all()
    serializer_class = YearSerializer
    # pagination_class = YearPagination


class YearUnpaginateView(viewsets.ModelViewSet):
    queryset = Year.objects.all()
    serializer_class = UnpaginateYearSerializer


class LicenseView(viewsets.ModelViewSet):
    queryset = License.objects.all()
    serializer_class = LicenseSerializer
    # pagination_class = LicensePagination
    
class LicenseUnpaginateView(viewsets.ModelViewSet):
    queryset = License.objects.all()
    serializer_class = UnpaginateLicenseSerializer


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # pagination_class = ProductPagination


class ProductUnpaginateView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = UnpaginateProductSerializer
