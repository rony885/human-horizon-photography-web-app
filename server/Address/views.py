
from django.shortcuts import render
from rest_framework import viewsets

from .models import Divisions, Districts, Upazilas, Unions
from .serializers import DivisionsSerializer, DistrictsSerializer, UpazilasSerializer, UnionsSerializer


class DivisionsView(viewsets.ModelViewSet):
    queryset = Divisions.objects.all()
    serializer_class = DivisionsSerializer
    
    
class DistrictsView(viewsets.ModelViewSet):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializer


class UpazilasView(viewsets.ModelViewSet):
    queryset = Upazilas.objects.all()
    serializer_class = UpazilasSerializer
    
    
class UnionsView(viewsets.ModelViewSet):
    queryset = Unions.objects.all()
    serializer_class = UnionsSerializer
