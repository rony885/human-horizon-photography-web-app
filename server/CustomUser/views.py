# views.py
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from django.contrib.auth import logout as django_logout
# from .serializers import UserSerializer, UserRegisterSerializer, UserLoginSerializer
# from .models import CustomUser
from .serializers import (
    UserSerializer,
    UserRegisterSerializer,
    UserLoginSerializer,
    ChangePasswordSerializer,
    SendResetOTPSerializer,
    ResetPasswordSerializer,
)

from .models import CustomUser

from .utils import generate_otp, save_otp, get_otp, delete_otp

from django.db import transaction
from django.http import JsonResponse
from rest_framework.decorators import api_view
# from .sms_service import send_sms
from .email_utils import send_otp_email



def authenticate_user(email=None, password=None):
    try:
        user = CustomUser.objects.get(email=email)
        if user.check_password(password):
            return user
    except CustomUser.DoesNotExist:
        return None


class AllUsersView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class AllowUnauthenticatedForLogout(BasePermission):
    def has_permission(self, request, view):
        # Allow unauthenticated requests only for the logout endpoint
        if request.method == 'POST' and view.__class__.__name__ == 'UserLogoutAPIView':
            return True
        # For other endpoints, require authentication
        authentication_classes = getattr(view, 'authentication_classes', [])
        for auth_class in authentication_classes:
            if isinstance(auth_class(), JWTTokenUserAuthentication):
                return request.user and request.user.is_authenticated
        return False


# ==== CurrentUserAPIView ====
class CurrentUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# ==== UserRegisterAPIView ====
class UserRegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ==== UserLoginAPIView ====
# class UserLoginAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         user = serializer.validated_data["user"]
#         refresh = RefreshToken.for_user(user)

#         return Response({
#             "refresh": str(refresh),
#             "access": str(refresh.access_token),
#         })

class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )


# ==== UserLogoutAPIView ====
class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated, AllowUnauthenticatedForLogout]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Invalidate Django session
            django_logout(request)

            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ==== staff and superuser ====
class StaffAndSuperuserLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        if not (user.is_staff or user.is_superuser):
            return Response(
                {"error": "You are not authorized to access this login."},
                status=status.HTTP_403_FORBIDDEN,
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })


# ==== Change Password API ====
class ChangePasswordAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data,
            context={
                'request': request
            }
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        user = request.user

        new_password = serializer.validated_data[
            'new_password'
        ]

        user.set_password(new_password)
        user.save(
            update_fields=[
                'password',
                'updated_at'
            ]
        )

        return Response(
            {
                'success': True,
                'message':
                    'Password changed successfully.'
            },
            status=status.HTTP_200_OK
        )


# ==== Forgot Password — Send OTP ====
class SendResetOTPAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendResetOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["eemmaaiill"]

        user = CustomUser.objects.get(
            eemmaaiill__iexact=email,
            is_active=True,
        )

        otp = generate_otp()

        # Email the OTP before saving it, so failed email delivery
        # does not leave a usable OTP in the cache.
        try:
            send_otp_email(user, otp)
        except Exception:
            return Response(
                {
                    "success": False,
                    "message": "Unable to send the OTP email. Please try again.",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        save_otp(email, otp)

        return Response(
            {
                "success": True,
                "message": "Password reset OTP sent to your email.",
            },
            status=status.HTTP_200_OK,
        )


# ==== Reset Password API ====
class ResetPasswordAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["eemmaaiill"]
        otp = serializer.validated_data["otp"]
        new_password = serializer.validated_data["new_password"]

        try:
            with transaction.atomic():
                user = CustomUser.objects.select_for_update().get(
                    eemmaaiill__iexact=email,
                    is_active=True,
                )

                saved_otp = get_otp(email)

                if not saved_otp or str(saved_otp) != str(otp):
                    return Response(
                        {
                            "otp": [
                                "Invalid or expired OTP. Please request a new one."
                            ]
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                user.set_password(new_password)
                user.save(update_fields=["password", "updated_at"])

                delete_otp(email)

            return Response(
                {
                    "success": True,
                    "message": "Password reset successfully.",
                },
                status=status.HTTP_200_OK,
            )

        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
