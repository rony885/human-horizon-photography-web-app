from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import BlogView, BlogUnpaginateView

from rest_framework import routers
route = routers.DefaultRouter()

route.register("blog", BlogView,
               basename='blog_view')
route.register("unpaginate_blog", BlogUnpaginateView,
               basename='unpaginate_blog_view')

urlpatterns = [
    path('blog_api/', include(route.urls)),
]

# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
