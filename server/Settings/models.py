from django.db import models
from django.utils.html import mark_safe

def generate_courier_id():
    prefix = "COU-"
    next_courier_id = '00001'

    # Get Last Courier Start With SUP-00001
    last_courier_id = Courier.objects.filter(
        courier_id__startswith=prefix).order_by('courier_id').last()

    if last_courier_id:
        # Cut 5 digit from the Right and converted to int (COU-:xxxxx)
        last_courier_id_four_digit = int(last_courier_id.courier_id[-5:])

        # Increment one with last five digit
        next_courier_id = '{0:05d}'.format(last_courier_id_four_digit + 1)

    # Return custom courier id number
    return prefix + next_courier_id


class GeneralSettings(models.Model):
    company_name = models.CharField(max_length=255)
    address = models.TextField()
    company_phone = models.CharField(max_length=30)
    other_phone = models.CharField(
        max_length=30,
        blank=True,
        null=True
    )
    email = models.EmailField()
    
    company_logo = models.ImageField(
        upload_to="settings/logo/"
    )
    facebook_link = models.URLField(
        blank=True,
        null=True
    )
    instagram_link = models.URLField(
        blank=True,
        null=True
    )
    twitter_link = models.URLField(
        blank=True,
        null=True
    )
    youtube_link = models.URLField(
        blank=True,
        null=True
    )
    map_url = models.TextField(
        blank=True,
        null=True
    )

    terms_conditions = models.TextField(  blank=True,
        null=True)
    privacy_policy = models.TextField(  blank=True,
        null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "General Settings"
        verbose_name_plural = "General Settings"

    def __str__(self):
        return self.company_name

    def logo_preview(self):
        if self.company_logo:
            return mark_safe(
                f'<img src="{self.company_logo.url}" width="70" height="70" />'
            )
        return "-"

    logo_preview.short_description = "Logo"
    
class Courier(models.Model):
    courier_id = models.CharField(
        max_length=25, unique=True, default=generate_courier_id)
    status = models.BooleanField(default=True)
    name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'courier'

    def __str__(self):
        return f"{self.name}"   
    
class DeliveryType(models.Model):
    status = models.BooleanField(default=True)
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=255, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'delivery_type'

    def __str__(self):
        return f"{self.name}"


