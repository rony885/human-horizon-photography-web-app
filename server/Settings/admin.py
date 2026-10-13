from django.contrib import admin
from .models import GeneralSettings, Courier, DeliveryType


@admin.register(GeneralSettings)
class GeneralSettingsAdmin(admin.ModelAdmin):

    list_display = (
        "company_name",
        "company_phone",
        "email",
        "logo_preview",
    )

    readonly_fields = (
        "logo_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (

        ("Company Information", {
            "fields": (
                "company_name",
                "address",
                "company_phone",
                "other_phone",
                "email",
                "company_logo",
                "logo_preview",
            )
        }),

        ("Social Links", {
            "fields": (
                "facebook_link",
                "instagram_link",
                "twitter_link",
                "youtube_link",
            )
        }),

        ("Google Map", {
            "fields": (
                "map_url",
            )
        }),

        ("Website Policy", {
            "fields": (
                "terms_conditions",
                "privacy_policy",
            )
        }),

        ("Information", {
            "fields": (
                "created_at",
                "updated_at",
            )
        }),
    )

    def has_add_permission(self, request):
        if GeneralSettings.objects.exists():
            return False
        return True
    
@admin.register(Courier)
class CourierAdmin(admin.ModelAdmin):
    list_display = ['id', 'courier_id', 'status',
                    'name',  'created_at', 'updated_at']

    readonly_fields = []

    search_fields = ['id', 'name', 'created_at']
    list_per_page = 10
    list_filter = ['created_at']


@admin.register(DeliveryType)
class DeliveryTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'name', 'amount',
                    'duration',  'created_at', 'updated_at']

    readonly_fields = []

    search_fields = ['id', 'name', 'created_at']
    list_per_page = 10
    list_filter = ['created_at']