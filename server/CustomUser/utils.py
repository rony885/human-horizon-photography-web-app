
import random

from django.conf import settings
from django.core.cache import cache


def generate_otp():
    return str(random.randint(100000, 999999))


def get_cache_key(email):
    return f"password_reset_otp_{email.strip().lower()}"


def save_otp(email, otp):
    cache.set(
        get_cache_key(email),
        otp,
        timeout=settings.OTP_EXPIRY_SECONDS,
    )


def get_otp(email):
    return cache.get(get_cache_key(email))


def delete_otp(email):
    cache.delete(get_cache_key(email))
