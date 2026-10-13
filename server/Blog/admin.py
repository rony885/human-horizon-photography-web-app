

from django.db import models
from django.contrib import admin
# from django_json_widget.widgets import JSONEditorWidget
from .models import Blog


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['id', 'blog_id', 'title', 'pub_date',
                     'pub_time', 'author', 'Image', 'status',
                    'created_at', 'updated_at']

    readonly_fields = ['Image']

    search_fields = ['id', 'title', 'created_at']
    list_per_page = 10
    list_filter = ['created_at']