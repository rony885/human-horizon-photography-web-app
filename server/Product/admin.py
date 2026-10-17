# from django.db import models
# from django.contrib import admin
# from django_json_widget.widgets import JSONEditorWidget
# from .models import Category, Year, Product


# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ['id', 'status', 'name','created_at', 'updated_at']
#                     # 'Image', 'created_at', 'updated_at']
                    

#     # readonly_fields = ['Image']

#     search_fields = ['id', 'name', 'created_at']
#     list_per_page = 10
#     list_filter = ['created_at']


# @admin.register(Year)
# class BrandAdmin(admin.ModelAdmin):
#     list_display = ['id', 'status', 'year',  'created_at', 'updated_at']

#     readonly_fields = []

#     search_fields = ['id', 'year', 'created_at']
#     list_per_page = 10
#     list_filter = ['created_at']


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     formfield_overrides = {
#         models.JSONField: {'widget': JSONEditorWidget},
#     }

#     list_display = ['id', 'product_id', 'status',
#                      'name', 'product_code', 'category', 'year',  
                   
#                     # 'purchase_stock', 'purchase_price', 'initial_stock', 'regularPrice', 'discount', 'specialPrice',
#                     # 'sizes', 'colors',
#                     'thumbnail_image', 'main_image', 
#                     'description', 
#                     'created_at', 'updated_at']

#     readonly_fields = ['thumbnail_image', 'preview_image']
                       

#     search_fields = ['id', 'name', 'created_at']
#     list_per_page = 10
#     list_filter = ['created_at']



from django import forms
from django.contrib import admin
from django.db import models
from django.utils.html import format_html

from .models import Category, Year, License, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'name','created_at', 'updated_at']
                    # 'Image', 'created_at', 'updated_at']
                    
    readonly_fields = []

    search_fields = ['id', 'name', 'created_at']
    list_per_page = 10
    list_filter = ['created_at']
    
    
@admin.register(Year)
class YearAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'year',  'created_at', 'updated_at']

    readonly_fields = []

    search_fields = ['id', 'year', 'created_at']
    list_per_page = 10
    list_filter = ['created_at']
    
    
@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ("id", "status", "name", "price",  'created_at', 'updated_at')
    
    search_fields = ('id', "name", 'created_at')
    list_per_page = 10
    list_filter = ['created_at']
    

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "product_id",
        "status",
        "name",
        "product_code",
        "category",
        "year",
        "license",
        "ThumbnailImage",
        "PreviewImage",
        "premium",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "status",
        "premium",
        "category",
        "year",
        "created_at",
    )

    search_fields = (
        "product_id",
        "name",
        "product_code",
    )

    list_per_page = 10

    # PRIVATE ORIGINAL IMAGE WIDGET
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == "original_image":
            kwargs["widget"] = forms.FileInput

        return super().formfield_for_dbfield(
            db_field, request, **kwargs
        )

    # SHOW ORIGINAL IMAGE FILE NAME WITHOUT A PUBLIC URL
    @admin.display(description="Original Image File")
    def OriginalImageName(self, obj):
        if obj and obj.original_image:
            return obj.original_image.name

        return "No original image uploaded"

    # THUMBNAIL PREVIEW
    @admin.display(description="Thumbnail Image")
    def ThumbnailImage(self, obj):
        if obj and obj.thumbnail_image:
            return format_html(
                '<img src="{}" width="100" height="70" '
                'style="object-fit: contain;" />',
                obj.thumbnail_image.url,
            )

        return "No thumbnail"

    # PREVIEW IMAGE
    @admin.display(description="Preview Image")
    def PreviewImage(self, obj):
        if obj and obj.preview_image:
            return format_html(
                '<img src="{}" width="100" height="70" '
                'style="object-fit: contain;" />',
                obj.preview_image.url,
            )

        return "No preview"