from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import DivisionsView, DistrictsView, UpazilasView, UnionsView

from rest_framework import routers
route = routers.DefaultRouter()

route.register("divisions", DivisionsView, basename='divisions_view')
route.register("districts", DistrictsView, basename='districts_view')
route.register("upazilas", UpazilasView, basename='upazilas_view')
route.register("unions", UnionsView, basename='unions_view')


urlpatterns = [
    path('address_api/', include(route.urls)),
]

# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
