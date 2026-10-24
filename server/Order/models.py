from django.db import models
from django.utils.html import mark_safe
from django.template.defaultfilters import truncatechars
from Product.models import Product
# from Settings.models import Courier, DeliveryType
from CustomUser.models import CustomUser
import datetime
from django.utils import timezone


def get_current_date_and_time(): return timezone.now()
def get_current_date(): return timezone.now().date()


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
    order_no = models.CharField(max_length=25, default=generate_order_no)
    customer = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)


    order_date_time = models.DateTimeField(default=get_current_date_and_time)
    order_date = models.DateField(default=get_current_date)
    payment_method = models.CharField(max_length=50)
    note = models.TextField(blank=True, null=True)

    total_item = models.IntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    grand_total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'orders'

    def __str__(self):
        return self.order_no


class OrderDetail(models.Model):
    order = models.ForeignKey(
        Order, related_name='order_details', on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'order_details'

    def __str__(self):
        return f"{self.order.order_no} - {self.product.name}"
