# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from django.conf import settings
# from django.conf.urls.static import static

# from server.Books.views import ContactView

# from .views import (

#     ContactView,
#     ContactUnpaginateView,
# )

# router = DefaultRouter()

# router.register(
#     "contact",
#     ContactView,
#     basename="contact",
# )

# router.register(
#     "unpaginate_contact",
#     ContactUnpaginateView,
#     basename="unpaginate_contact",
# )


# urlpatterns = [
#     path("contact_api/", include(router.urls)),
# ]

# # +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL,
#                           document_root=settings.STATIC_ROOT)
#     urlpatterns += static(settings.MEDIA_URL,
#                           document_root=settings.MEDIA_ROOT)



# from rest_framework.routers import DefaultRouter
# from .views import ContactMessageViewSet

# router = DefaultRouter()

# router.register(
#     "contact",
#     ContactMessageViewSet,
#     basename="contact"
# )

# urlpatterns = router.urls


from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.routers import DefaultRouter
from rest_framework import routers
route = routers.DefaultRouter()

from .views import (
    ContactView,
    ContactUnpaginateView,
)

router = DefaultRouter()

router.register(
    "contact",
    ContactView,
    basename="contact",
)

router.register(
    "unpaginate_contact",
    ContactUnpaginateView,
    basename="unpaginate_contact",
)

urlpatterns = [
    path("contact_api/", include(router.urls)),
]


# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)