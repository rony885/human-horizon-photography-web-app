from rest_framework import viewsets

from .models import GeneralSettings, Courier, DeliveryType
# from .serializers import (
#     GeneralSettingsSerializer,
#     UnpaginateGeneralSettingsSerializer,
# )
from .serializers import GeneralSettingsSerializer, CourierSerializer, DeliveryTypeSerializer
from .serializers import UnpaginateGeneralSettingsSerializer, UnpaginateCourierSerializer, UnpaginateDeliveryTypeSerializer


class GeneralSettingsView(viewsets.ModelViewSet):
    queryset = GeneralSettings.objects.all()
    serializer_class = GeneralSettingsSerializer
    # pagination_class = GeneralSettingsPagination

class GeneralSettingsUnpaginateView(viewsets.ModelViewSet):
    queryset = GeneralSettings.objects.all()
    serializer_class = UnpaginateGeneralSettingsSerializer
    
class CourierView(viewsets.ModelViewSet):
    queryset = Courier.objects.all()
    serializer_class = CourierSerializer
    # pagination_class = CourierPagination


class CourierUnpaginateView(viewsets.ModelViewSet):
    queryset = Courier.objects.all()
    serializer_class = UnpaginateCourierSerializer
    
    
class DeliveryTypeView(viewsets.ModelViewSet):
    queryset = DeliveryType.objects.all()
    serializer_class = DeliveryTypeSerializer
    # pagination_class = DeliveryTypePagination

class DeliveryTypeUnpaginateView(viewsets.ModelViewSet):
    queryset = DeliveryType.objects.all()
    serializer_class = UnpaginateDeliveryTypeSerializer
