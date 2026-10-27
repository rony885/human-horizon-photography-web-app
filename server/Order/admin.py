# from django.contrib import admin
# from .models import Order, OrderDetail


# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ['id', 'order_no',
#                      'customer', 
#                     'order_date_time', 'order_date', 'payment_method', 'note',
#                     'total_item', 'total_amount',  'discount', 
#                       'grand_total_amount',
#                     'created_at', 'updated_at']
#     readonly_fields = []
#     search_fields = ['id', 'order_no', 'order_date', 'created_at']
#     list_per_page = 10
#     list_filter = ['created_at']


# @admin.register(OrderDetail)
# class OrderDetailAdmin(admin.ModelAdmin):
#     list_display = ['id', 'order', 'product',
                   
#                     'created_at', 'updated_at']
#     readonly_fields = []
#     search_fields = ['id', 'created_at']
#     list_per_page = 10
#     list_filter = ['created_at']



# from django.contrib import admin

# from .models import Order, OrderDetail


# class OrderDetailInline(admin.TabularInline):
#     model = OrderDetail
#     extra = 0
#     can_delete = False

#     fields = (
#         "product",
#         "license",
#         "quantity",
#         "unit_price",
#         "line_total",
#     )

#     readonly_fields = (
#         "product",
#         "license",
#         "quantity",
#         "unit_price",
#         "line_total",
#     )


# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):

#     list_display = (
#         "id",
#         "order_no",
#         "customer",
#         "order_date",
#         "total_item",
#         "grand_total_amount",
#         "payment_method",
#         "payment_status",
#         "delivery_status",
#     )

#     list_filter = (
#         "payment_status",
#         "payment_method",
#         "delivery_status",
#         "order_date",
#     )

#     search_fields = (
#         "order_no",
#         "customer__email",
#         "customer__name",
#         "gateway_transaction_id",
#     )

#     readonly_fields = (
#         "order_no",
#         "customer",
#         "order_date_time",
#         "order_date",
#         "transaction_id",
#         "gateway_transaction_id",
#         "currency",
#         "total_item",
#         "total_amount",
#         "grand_total_amount",
#         "paid_at",
#         "created_at",
#         "updated_at",
#     )

#     date_hierarchy = "order_date"
#     ordering = ("-created_at",)
#     inlines = [OrderDetailInline]


# @admin.register(OrderDetail)
# class OrderDetailAdmin(admin.ModelAdmin):

#     list_display = (
#         "id",
#         "order",
#         "product",
#         "license",
#         "quantity",
#         "unit_price",
#         "line_total",
#     )

#     search_fields = (
#         "order__order_no",
#         "product__name",
#         "product__product_code",
#     )

#     list_select_related = (
#         "order",
#         "product",
#         "license",
#     )

#     readonly_fields = (
#         "order",
#         "product",
#         "license",
#         "quantity",
#         "unit_price",
#         "line_total",
#         "created_at",
#         "updated_at",
#     )




from django.contrib import admin

from .models import Order, OrderDetail


class OrderDetailInline(admin.TabularInline):
    model = OrderDetail
    extra = 0
    can_delete = False

    fields = (
        "product",
        "license",
        "quantity",
        "unit_price",
        "line_total",
        "created_at",
        "updated_at",
    )

    readonly_fields = (
        "product",
        "license",
        "quantity",
        "unit_price",
        "line_total",
        "created_at",
        "updated_at",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order_no",
        "customer",
        "payment_method",
        "payment_status",
        "currency",
        "grand_total_amount",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "payment_method",
        "currency",
        "delivery_status",
        "created_at",
    )

    search_fields = (
        "order_no",
        "customer__email",
        "customer__name",
        "gateway_transaction_id",
    )

    readonly_fields = (
        "order_no",
        "transaction_id",
        "gateway_transaction_id",
        "paid_at",
        "created_at",
        "updated_at",
    )

    inlines = [OrderDetailInline]
    list_per_page = 25
