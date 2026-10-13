from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    class Meta:
        model = Blog
        fields = '__all__'


class UnpaginateBlogSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    class Meta:
        model = Blog
        fields = '__all__'
