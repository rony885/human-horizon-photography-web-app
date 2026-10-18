# from rest_framework import serializers
# from .models import Category, Year,  Product


# class CategorySerializer(serializers.ModelSerializer):
#     status = serializers.BooleanField(default=True)

#     class Meta:
#         model = Category
#         fields = '__all__'


# class UnpaginateCategorySerializer(serializers.ModelSerializer):
#     status = serializers.BooleanField(default=True)

#     class Meta:
#         model = Category
#         fields = '__all__'


# class YearSerializer(serializers.ModelSerializer):
#     status = serializers.BooleanField(default=True)

#     class Meta:
#         model = Year
#         fields = '__all__'


# class UnpaginateYearSerializer(serializers.ModelSerializer):
#     status = serializers.BooleanField(default=True)

#     class Meta:
#         model = Year
#         fields = '__all__'


# class ProductSerializer(serializers.ModelSerializer):
#     status = serializers.BooleanField(default=True)
#     category = CategorySerializer()
#     year = YearSerializer()


#     class Meta:
#         model = Product
#         fields = '__all__'


# class UnpaginateProductSerializer(serializers.ModelSerializer):
#     status = serializers.BooleanField(default=True)
#     category = CategorySerializer()
#     year = YearSerializer()

#     class Meta:
#         model = Product
#         fields = '__all__'


from rest_framework import serializers
from .models import Category, Year, License, Product


class CategorySerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    class Meta:
        model = Category
        fields = "__all__"

class UnpaginateCategorySerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    class Meta:
        model = Category
        fields = "__all__"

class YearSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    class Meta:
        model = Year
        fields = "__all__"


class UnpaginateYearSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    class Meta:
        model = Year
        fields = "__all__"


class LicenseSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    class Meta:
        model = License
        fields = "__all__"

class UnpaginateLicenseSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    class Meta:
        model = License
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    category = CategorySerializer(read_only=True)
    year = YearSerializer(read_only=True)
    license = LicenseSerializer(read_only=True)

    # Accept original image uploads, but never expose the private file URL.
    original_image = serializers.ImageField(
        write_only=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "product_id",
            "status",
            "name",
            "product_code",
            "category",
            "year",
            "license",
            "thumbnail_image",
            "preview_image",
            "original_image",
            "upload_date",
            "premium",
            "premium_text",
            "description",
            "formats",
            "created_at",
            "updated_at",
        ]


class UnpaginateProductSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    category = CategorySerializer(read_only=True)
    year = YearSerializer(read_only=True)
    license = LicenseSerializer(read_only=True)

    # Accept original image uploads, but never expose the private file URL.
    original_image = serializers.ImageField(
        write_only=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "product_id",
            "status",
            "name",
            "product_code",
            "category",
            "year",
            "license",
            "thumbnail_image",
            "preview_image",
            "original_image",
            "upload_date",
            "premium",
            "premium_text",
            "description",
            "formats",
            "created_at",
            "updated_at",
        ]
