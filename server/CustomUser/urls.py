from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


from .views import (
    UserRegisterAPIView,
    UserLoginAPIView,
    UserLogoutAPIView,
    CurrentUserAPIView,
    StaffAndSuperuserLoginAPIView,
    
    ChangePasswordAPIView,
    SendResetOTPAPIView,
    ResetPasswordAPIView,
)

from rest_framework import routers
from .views import AllUsersView
route = routers.DefaultRouter()
route.register("all_users", AllUsersView,
               basename='all_users_view')

urlpatterns = [
    path('', include(route.urls)),

    path('register/', UserRegisterAPIView.as_view(), name='user-register'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('logout/', UserLogoutAPIView.as_view(), name='user-logout'),
    path('current_user/', CurrentUserAPIView.as_view(), name='current-user'),
    path('staff_and_superuser_login/', StaffAndSuperuserLoginAPIView.as_view(),
         name='staff-and-superuser-login'),
    

    path(
        'change_password/',
        ChangePasswordAPIView.as_view(),
        name='change-password'
    ),

    path(
        'send_reset_otp/',
        SendResetOTPAPIView.as_view(),
        name='send-reset-otp'
    ),

    path(
        'reset_password/',
        ResetPasswordAPIView.as_view(),
        name='reset-password'
    ),
]

# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
