# from django.db import models
# from django.utils.html import mark_safe
# from django.template.defaultfilters import truncatechars
# from Product.models import Product
# # from Settings.models import Courier, DeliveryType
# from CustomUser.models import CustomUser
# import datetime
# from django.utils import timezone


# def get_current_date_and_time(): return timezone.now()
# def get_current_date(): return timezone.now().date()


# def generate_order_no():
#     today_date = datetime.date.today()

#     # GET Current Year
#     current_year = today_date.strftime('%y')
#     current_month = today_date.strftime('%m')
#     prefix = "O-" + current_year + current_month

#     # For the very first time order_no is O-20240100001
#     next_order_no = '00001'

#     # Get Last Item Start With O-"
#     last_order_no = Order.objects.filter(
#         order_no__startswith=prefix).order_by('order_no').last()

#     if last_order_no:
#         # Cut 5 digit from the Right and converted to int (O-:xxxxx)
#         last_order_no_four_digit = int(last_order_no.order_no[-5:])

#         # Increment one with last five digit
#         next_order_no = '{0:05d}'.format(last_order_no_four_digit + 1)

#     # Return custom order_no
#     return prefix + next_order_no


# class Order(models.Model):
#     order_no = models.CharField(max_length=25, default=generate_order_no)
#     customer = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)


#     order_date_time = models.DateTimeField(default=get_current_date_and_time)
#     order_date = models.DateField(default=get_current_date)
#     payment_method = models.CharField(max_length=50)
#     note = models.TextField(blank=True, null=True)

#     total_item = models.IntegerField()
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     grand_total_amount = models.DecimalField(max_digits=10, decimal_places=2)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'orders'

#     def __str__(self):
#         return self.order_no


# class OrderDetail(models.Model):
#     order = models.ForeignKey(
#         Order, related_name='order_details', on_delete=models.DO_NOTHING)
#     product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'order_details'

#     def __str__(self):
#         return f"{self.order.order_no} - {self.product.name}"




# import uuid

# from django.conf import settings
# from django.db import models
# from django.utils import timezone


# def generate_order_no():
#     today = timezone.localdate()
#     prefix = f"O-{today.strftime('%y%m')}"

#     last_order = (
#         Order.objects
#         .filter(order_no__startswith=prefix)
#         .order_by("-order_no")
#         .first()
#     )

#     next_number = (
#         int(last_order.order_no[-5:]) + 1
#         if last_order
#         else 1
#     )

#     return f"{prefix}{next_number:05d}"


# class Order(models.Model):

#     DELIVERY_STATUS_CHOICES = [
#         ("pending", "Pending"),
#         ("available", "Available for Download"),
#         ("completed", "Completed"),
#         ("failed", "Failed"),
#     ]

#     PAYMENT_METHOD_CHOICES = [
#         ("SSLCOMMERZ", "SSLCommerz"),
#         ("BKASH", "bKash"),
#         ("NAGAD", "Nagad"),
#         ("ROCKET", "Rocket"),
#         ("CARD", "Card"),
#         ("OTHER", "Other"),
#     ]

#     PAYMENT_STATUS_CHOICES = [
#         ("PENDING", "Pending"),
#         ("PAID", "Paid"),
#         ("FAILED", "Failed"),
#         ("CANCELLED", "Cancelled"),
#         ("REFUNDED", "Refunded"),
#     ]

#     order_no = models.CharField(
#         max_length=25,
#         unique=True,
#         default=generate_order_no,
#         editable=False,
#     )

#     customer = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.PROTECT,
#         related_name="orders",
#     )

#     order_date_time = models.DateTimeField(
#         default=timezone.now
#     )

#     order_date = models.DateField(
#         default=timezone.localdate
#     )

#     delivery_status = models.CharField(
#         max_length=50,
#         choices=DELIVERY_STATUS_CHOICES,
#         default="pending",
#         db_index=True,
#     )

#     payment_method = models.CharField(
#         max_length=50,
#         choices=PAYMENT_METHOD_CHOICES,
#         default="SSLCOMMERZ",
#     )

#     payment_status = models.CharField(
#         max_length=50,
#         choices=PAYMENT_STATUS_CHOICES,
#         default="PENDING",
#         db_index=True,
#     )

#     transaction_id = models.UUIDField(
#         default=uuid.uuid4,
#         unique=True,
#         editable=False,
#     )

#     gateway_transaction_id = models.CharField(
#         max_length=150,
#         blank=True,
#         null=True,
#     )

#     currency = models.CharField(
#         max_length=3,
#         default="BDT",
#     )

#     total_item = models.PositiveIntegerField(
#         default=0
#     )

#     total_amount = models.DecimalField(
#         max_digits=10,
#         decimal_places=2,
#         default=0,
#     )

#     grand_total_amount = models.DecimalField(
#         max_digits=10,
#         decimal_places=2,
#         default=0,
#     )

#     note = models.TextField(
#         blank=True,
#         null=True,
#     )

#     paid_at = models.DateTimeField(
#         blank=True,
#         null=True,
#     )

#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     updated_at = models.DateTimeField(
#         auto_now=True
#     )

#     class Meta:
#         db_table = "orders"
#         ordering = ["-created_at"]

#     def __str__(self):
#         return f"{self.order_no} - {self.customer}"


# class OrderDetail(models.Model):

#     order = models.ForeignKey(
#         Order,
#         related_name="order_details",
#         on_delete=models.PROTECT,
#     )

#     product = models.ForeignKey(
#         "Product.Product",
#         related_name="order_details",
#         on_delete=models.PROTECT,
#     )

#     license = models.ForeignKey(
#         "Product.License",
#         related_name="order_details",
#         on_delete=models.PROTECT,
#     )

#     quantity = models.PositiveIntegerField(
#         default=1
#     )

#     unit_price = models.DecimalField(
#         max_digits=10,
#         decimal_places=2,
#     )

#     line_total = models.DecimalField(
#         max_digits=10,
#         decimal_places=2,
#     )

#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     updated_at = models.DateTimeField(
#         auto_now=True
#     )

#     class Meta:
#         db_table = "order_details"
#         ordering = ["id"]
#         constraints = [
#             models.CheckConstraint(
#                 condition=models.Q(quantity__gte=1),
#                 name="order_detail_quantity_gte_1",
#             )
#         ]

#     def save(self, *args, **kwargs):
#         self.line_total = self.unit_price * self.quantity
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.order.order_no} - {self.product}"




import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone

from Product.models import Product
from CustomUser.models import CustomUser

import datetime
def get_current_date_and_time(): return timezone.now()
def get_current_date(): return timezone.now().date()

# def generate_order_no():
#     return f"HH-{timezone.now():%Y%m%d}-{uuid.uuid4().hex[:8].upper()}"

def generate_order_no():
    today_date = datetime.date.today()

    # GET Current Year
    current_year = today_date.strftime('%y')
    current_month = today_date.strftime('%m')
    prefix = "O-" + current_year + current_month

    # For the very first time order_no is O-20240100001
    next_order_no = '00001'

    # Get Last Item Start With O-"
    last_order_no = Order.objects.filter(
        order_no__startswith=prefix).order_by('order_no').last()

    if last_order_no:
        # Cut 5 digit from the Right and converted to int (O-:xxxxx)
        last_order_no_four_digit = int(last_order_no.order_no[-5:])

        # Increment one with last five digit
        next_order_no = '{0:05d}'.format(last_order_no_four_digit + 1)

    # Return custom order_no
    return prefix + next_order_no



class Order(models.Model):

    DELIVERY_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("READY", "Ready for Download"),
        ("COMPLETED", "Completed"),
    ]

    PAYMENT_METHOD_CHOICES = [
        ("SHURJOPAY", "ShurjoPay"),
        ("MANUAL", "Manual Payment"),
    ]

    PAYMENT_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PAID", "Paid"),
        ("FAILED", "Failed"),
        ("CANCELLED", "Cancelled"),
    ]

    CURRENCY_CHOICES = [
        ("BDT", "Bangladeshi Taka"),
        ("USD", "US Dollar"),
    ]

    # order_no = models.CharField(
    #     max_length=25,
    #     unique=True,
    #     default=generate_order_no,
    #     editable=False,
    # )

    # customer = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.PROTECT,
    #     related_name="orders",
    # )
    
    order_no = models.CharField(max_length=25, default=generate_order_no)
    customer = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)

    order_date_time = models.DateTimeField(default=timezone.now)
    order_date = models.DateField(default=timezone.localdate)

    delivery_status = models.CharField(
        max_length=20,
        choices=DELIVERY_STATUS_CHOICES,
        default="PENDING",
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        default="SHURJOPAY",
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="PENDING",
    )

    transaction_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
    )

    gateway_transaction_id = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        db_index=True,
    )

    currency = models.CharField(
        max_length=3,
        choices=CURRENCY_CHOICES,
        default="BDT",
    )

    note = models.TextField(blank=True, default="")

    total_item = models.PositiveIntegerField(default=0)

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    grand_total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    paid_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_no


class OrderDetail(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.PROTECT,
        related_name="order_details",
    )

    product = models.ForeignKey(
        "Product.Product",
        on_delete=models.PROTECT,
        related_name="order_details",
    )
    
    # order = models.ForeignKey(
    #     Order, related_name='order_details', on_delete=models.DO_NOTHING)
    # product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)

    license = models.ForeignKey(
        "Product.License",
        on_delete=models.PROTECT,
        related_name="order_details",
    )

    quantity = models.PositiveIntegerField(default=1)

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    line_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.order.order_no} - {self.product.name}"
