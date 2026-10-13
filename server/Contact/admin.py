from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "phone",
        "email",
        "subject",
        "message",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "name",
        "phone",
        "email",
        "subject",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 20

    readonly_fields = (
        "created_at",
        "updated_at",
    )