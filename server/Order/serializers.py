# from rest_framework import serializers
# from .models import Order, OrderDetail
# from Product.serializers import ProductSerializer
# from Settings.serializers import CourierSerializer, DeliveryTypeSerializer
# from CustomUser.serializers import UserSerializer
# from Product.models import Product


# # order detail
# class OrderDetailCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderDetail
#         fields = ['product', 'created_at', 'updated_at']
                   

# class OrderDetailSerializer(serializers.ModelSerializer):
#     order = serializers.PrimaryKeyRelatedField(read_only=True)

#     class Meta:
#         model = OrderDetail
#         fields = ['id', 'order', 'product',
#                     'created_at', 'updated_at']


# class UnpaginateOrderDetailSerializer(serializers.ModelSerializer):
#     product = ProductSerializer()
#     order = serializers.PrimaryKeyRelatedField(read_only=True)

#     class Meta:
#         model = OrderDetail
#         fields = ['id', 'order', 'product',
#                     'created_at', 'updated_at']


# # order
# class OrderSerializer(serializers.ModelSerializer):
#     order_details = OrderDetailSerializer(many=True)

#     class Meta:
#         model = Order
#         fields = ['id', 'order_no', 'customer', 'order_date_time',
#                   'order_date', 'payment_method', 'note', 'total_item',
#                    'total_amount',  'discount', 'grand_total_amount',
#                    'order_details',  'created_at', 'updated_at']

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         request = self.context.get('request')
#         if request and request.method == 'GET':
#             self.fields['order_details'] = OrderDetailSerializer(many=True)

#     def validate_order_details(self, value):
#         if not isinstance(value, list):
#             raise serializers.ValidationError(
#                 "order_details must be a list of items")
#         if not value:
#             raise serializers.ValidationError("order_details cannot be empty")
#         return value

#     # def create(self, validated_data):
#     #     order_details_data = validated_data.pop('order_details')

#     #     order = Order.objects.create(**validated_data)

#     #     for order_detail_data in order_details_data:
#     #         OrderDetail.objects.create(order=order, **order_detail_data)

#     #         # order stock  update in product table
#     #         currProd = Product.objects.get(
#     #             id=order_detail_data['product'].id)

#     #         # stock
#     #         Product.objects.filter(id=order_detail_data['product'].id).update(
#     #             initial_stock=currProd.initial_stock - order_detail_data['quantity'])

#     #     return order

#     def create(self, validated_data):
#         order_details_data = validated_data.pop("order_details")

#         order = Order.objects.create(**validated_data)

#         for order_detail_data in order_details_data:
#             OrderDetail.objects.create(
#                 order=order,
#                 **order_detail_data
#             )

#         return order

# class UnpaginateOrderSerializer(serializers.ModelSerializer):
#     courier = CourierSerializer()
#     customer = UserSerializer()
#     delivery_type = DeliveryTypeSerializer()
#     order_details = UnpaginateOrderDetailSerializer(many=True)

#     class Meta:
#         model = Order
#         fields = ['id', 'order_no', 'customer', 'order_date_time',
#                   'order_date', 'payment_method', 'note', 'total_item',
#                   'total_amount', 'discount', 'grand_total_amount',
#                   'order_details', 'created_at', 'updated_at']

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         request = self.context.get('request')
#         if request and request.method == 'GET':
#             self.fields['order_details'] = OrderDetailSerializer(many=True)

#     def validate_order_details(self, value):
#         if not isinstance(value, list):
#             raise serializers.ValidationError(
#                 "order_details must be a list of items")
#         if not value:
#             raise serializers.ValidationError("order_details cannot be empty")
#         return value

#     def create(self, validated_data):
#         order_details_data = validated_data.pop('order_details')

#         order = Order.objects.create(**validated_data)

#         for order_detail_data in order_details_data:
#             OrderDetail.objects.create(order=order, **order_detail_data)

#         return order



from decimal import Decimal

from django.db import transaction

from rest_framework import serializers

from .models import Order, OrderDetail
from Product.models import Product, License
from Product.serializers import ProductSerializer
from CustomUser.serializers import UserSerializer


# PRODUCT LICENSE
class OrderLicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = ["id", "name", "price"]


# ORDER DETAIL CREATE
class OrderDetailCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = [
            "product",
            "license",
            "quantity",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )
        return value


# ORDER DETAIL
class OrderDetailSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True)
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )
    license = serializers.PrimaryKeyRelatedField(
        queryset=License.objects.all()
    )

    class Meta:
        model = OrderDetail
        fields = [
            "id",
            "order",
            "product",
            "license",
            "quantity",
            "unit_price",
            "line_total",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "order",
            "unit_price",
            "line_total",
            "created_at",
            "updated_at",
        ]

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )
        return value


# UNPAGINATE ORDER DETAIL
class UnpaginateOrderDetailSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True)
    product = ProductSerializer(read_only=True)
    license = OrderLicenseSerializer(read_only=True)

    class Meta:
        model = OrderDetail
        fields = [
            "id",
            "order",
            "product",
            "license",
            "quantity",
            "unit_price",
            "line_total",
            "created_at",
            "updated_at",
        ]


# ORDER
class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailCreateSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_no",
            "customer",
            "order_date_time",
            "order_date",
            "delivery_status",
            "payment_method",
            "payment_status",
            "transaction_id",
            "gateway_transaction_id",
            "currency",
            "total_item",
            "total_amount",
            "grand_total_amount",
            "note",
            "paid_at",
            "order_details",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "order_no",
            "customer",
            "order_date_time",
            "delivery_status",
            "payment_status",
            "transaction_id",
            "gateway_transaction_id",
            "currency",
            "total_item",
            "total_amount",
            "grand_total_amount",
            "paid_at",
            "created_at",
            "updated_at",
        ]

    def validate_order_details(self, value):
        if not value:
            raise serializers.ValidationError(
                "order_details cannot be empty."
            )
        return value

    @transaction.atomic
    def create(self, validated_data):
        order_details_data = validated_data.pop("order_details")
        request = self.context.get("request")

        if request is None or not request.user.is_authenticated:
            raise serializers.ValidationError(
                "Authentication is required to create an order."
            )

        # Never trust totals or payment status sent by the frontend.
        order = Order.objects.create(
            customer=request.user,
            payment_status="PENDING",
            delivery_status="pending",
            currency="BDT",
            total_item=0,
            total_amount=Decimal("0.00"),
            grand_total_amount=Decimal("0.00"),
            **validated_data,
        )

        total_amount = Decimal("0.00")
        total_item = 0

        for detail_data in order_details_data:
            product = detail_data["product"]
            license_obj = detail_data["license"]
            quantity = detail_data.get("quantity", 1)

            # Get the license price from the database.
            unit_price = Decimal(str(license_obj.price))
            line_total = unit_price * quantity

            OrderDetail.objects.create(
                order=order,
                product=product,
                license=license_obj,
                quantity=quantity,
                unit_price=unit_price,
                line_total=line_total,
            )

            total_amount += line_total
            total_item += quantity

        order.total_item = total_item
        order.total_amount = total_amount
        order.grand_total_amount = total_amount

        order.save(
            update_fields=[
                "total_item",
                "total_amount",
                "grand_total_amount",
                "updated_at",
            ]
        )

        return order


# UNPAGINATE ORDER
class UnpaginateOrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    order_details = UnpaginateOrderDetailSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_no",
            "customer",
            "order_date_time",
            "order_date",
            "delivery_status",
            "payment_method",
            "payment_status",
            "transaction_id",
            "gateway_transaction_id",
            "currency",
            "total_item",
            "total_amount",
            "grand_total_amount",
            "note",
            "paid_at",
            "order_details",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Use the request context for absolute image URLs, if supported
        # by the nested ProductSerializer.
        return data
