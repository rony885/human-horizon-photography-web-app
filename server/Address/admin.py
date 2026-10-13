
# Register your models here.
from django.db import models
from django.contrib import admin
from django_json_widget.widgets import JSONEditorWidget
from .models import Divisions, Districts, Upazilas, Unions

@admin.register(Divisions)
class DivisionsAdmin(admin.ModelAdmin):
    list_display = ['id',  'name', 'bn_name',
                     'url', 'created_at', 'updated_at']
    search_fields = ['id', 'name', 'created_at']
    list_per_page = 50
    list_filter = ['created_at']


@admin.register(Districts)
class DistrictsAdmin(admin.ModelAdmin):
    list_display = ['id', 'division', 'name', 'bn_name',
                    'lat', 'lon', 'url', 'created_at', 'updated_at']
    search_fields = ['id', 'name', 'created_at']
    list_per_page = 50
    list_filter = ['created_at']


@admin.register(Upazilas)
class UpazilasAdmin(admin.ModelAdmin):
    list_display = ['id', 'district', 'name',
                    'bn_name', 'url', 'created_at', 'updated_at']
    search_fields = ['id', 'name', 'created_at']
    list_per_page = 50
    list_filter = ['created_at']
    
    
@admin.register(Unions)
class UnionsAdmin(admin.ModelAdmin):
    list_display = ['id', 'upazila', 'name',
                    'bn_name', 'url', 'created_at', 'updated_at']
    search_fields = ['id', 'name', 'created_at']
    list_per_page = 50
    list_filter = ['created_at']

