# serializers.py
from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "name",
            "phone",
            "eemmaaiill",
            "district",
            "upazila",
            "address",
            "image",
            "is_active",
            "is_staff",
            "is_superuser",
            "created_at",
            "updated_at",
        ]


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )
    confirm_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )
    phone = serializers.CharField(required=True)
    eemmaaiill = serializers.EmailField(required=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "name",
            "phone",
            "eemmaaiill",
            "district",
            "upazila",
            "address",
            "image",
            "password",
            "confirm_password",
            "is_staff",
            "is_superuser",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "is_staff",
            "is_superuser",
            "created_at",
            "updated_at",
        ]

    def validate_phone(self, value):
        value = value.strip()

        if not value.isdigit() or len(value) != 11:
            raise serializers.ValidationError(
                "Phone number must contain exactly 11 digits."
            )

        if CustomUser.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                "This phone number is already registered."
            )

        return value

    def validate_eemmaaiill(self, value):
        value = value.strip().lower()

        if CustomUser.objects.filter(
            eemmaaiill__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This email address is already registered."
            )

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        validated_data.pop("is_staff", None)
        validated_data.pop("is_superuser", None)

        return CustomUser.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({
                "error": "Invalid email or password."
            })

        if not user.check_password(password):
            raise serializers.ValidationError({
                "error": "Invalid email or password."
            })

        if not user.is_active:
            raise serializers.ValidationError({
                "error": "This account is inactive."
            })

        attrs["user"] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )
    new_password = serializers.CharField(
        write_only=True,
        min_length=4,
        trim_whitespace=False,
    )
    confirm_new_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate(self, attrs):
        request = self.context.get("request")

        if not request or not request.user.check_password(
            attrs["old_password"]
        ):
            raise serializers.ValidationError({
                "old_password": "Current password is incorrect."
            })

        if attrs["new_password"] != attrs["confirm_new_password"]:
            raise serializers.ValidationError({
                "confirm_new_password": "Passwords do not match."
            })

        return attrs


class SendResetOTPSerializer(serializers.Serializer):
    eemmaaiill = serializers.EmailField()

    def validate_eemmaaiill(self, value):
        value = value.strip().lower()

        if not CustomUser.objects.filter(
            eemmaaiill__iexact=value,
            is_active=True,
        ).exists():
            raise serializers.ValidationError(
                "No active account found with this email address."
            )

        return value


class ResetPasswordSerializer(serializers.Serializer):
    eemmaaiill = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)
    new_password = serializers.CharField(
        write_only=True,
        min_length=4,
        trim_whitespace=False,
    )
    confirm_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate_eemmaaiill(self, value):
        value = value.strip().lower()

        if not CustomUser.objects.filter(
            eemmaaiill__iexact=value,
            is_active=True,
        ).exists():
            raise serializers.ValidationError(
                "No active account found with this email address."
            )

        return value

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })

        return attrs
