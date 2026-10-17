from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import CategoryView, CategoryUnpaginateView, YearView, LicenseView, LicenseUnpaginateView, YearUnpaginateView, ProductView, ProductUnpaginateView

from rest_framework import routers
route = routers.DefaultRouter()

route.register("category", CategoryView,
               basename='category_view')
route.register("unpaginate_category", CategoryUnpaginateView,
               basename='unpaginate_category_view')

route.register("year", YearView,
               basename='year_view')
route.register("unpaginate_year", YearUnpaginateView,
               basename='unpaginate_year_view')

route.register("license", LicenseView,
               basename='license_view')
route.register("unpaginate_license", LicenseUnpaginateView,
               basename='unpaginate_license_view')

route.register("product", ProductView,
               basename='product_view')
route.register("unpaginate_product", ProductUnpaginateView,
               basename='unpaginate_product_view')


urlpatterns = [
    path('product_api/', include(route.urls)),
]

# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
