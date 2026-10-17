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


# CATEGORY SERIALIZER
class CategorySerializer(serializers.ModelSerializer):
    categories = serializers.CharField(source="name", read_only=True)

    class Meta:
        model = Category
        fields = [
            "id",
            "status",
            "name",
            "categories",
            "created_at",
            "updated_at",
        ]


class UnpaginateCategorySerializer(CategorySerializer):
    pass


# YEAR SERIALIZER
class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = [
            "id",
            "status",
            "year",
            "created_at",
            "updated_at",
        ]


class UnpaginateYearSerializer(YearSerializer):
    pass

# LICENSE SERIALIZER
class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = [
            "id",
            "status",
            "name",
            "price",
            "description",
            "created_at",
            "updated_at",
        ]
        
class UnpaginateLicenseSerializer(YearSerializer):
    pass


# PRODUCT SERIALIZER
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    year = YearSerializer(read_only=True)

    assetId = serializers.CharField(
        source="product_code",
        required=True,
    )

    uploadDate = serializers.DateField(
        source="upload_date",
        required=False,
    )

    premiumText = serializers.CharField(
        source="premium_text",
        required=False,
    )

    descriptions = serializers.CharField(
        source="description",
        required=False,
        allow_blank=True,
        allow_null=True,
    )

    categoriesId = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=Category.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )

    yearId = serializers.PrimaryKeyRelatedField(
        source="year",
        queryset=Year.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )

    category_id = serializers.IntegerField(read_only=True)
    year_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "product_id",
            "status",
            "name",
            "assetId",
            "category",
            "category_id",
            "categoriesId",
            "year",
            "year_id",
            "yearId",
            "thumbnail_image",
            "preview_image",
            "uploadDate",
            "premium",
            "premiumText",
            "descriptions",
            "formats",
            "licenses",
            "created_at",
            "updated_at",
        ]


# UNPAGINATED PRODUCT SERIALIZER
class UnpaginateProductSerializer(ProductSerializer):
    pass