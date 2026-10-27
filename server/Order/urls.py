from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    order_list_create_view,
    order_detail_view,
    initiate_order_payment,
    verify_order_payment,
    download_product,
)

urlpatterns = [
    path('order/', order_list_create_view, name='order_create'),
    path('order/<int:order_id>/', order_detail_view, name='order_detail_view'),
    
    path(
        "order/payment/initiate/",
        initiate_order_payment,
        name="initiate_order_payment",
    ),
    path(
        "order/payment/verify/",
        verify_order_payment,
        name="verify_order_payment",
    ),
    path(
        "download/<int:product_id>/",
        download_product,
        name="download_product",
    ),
]

# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
