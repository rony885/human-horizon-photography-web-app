# from django.db import models
# from django.utils.html import mark_safe
# from django.template.defaultfilters import truncatechars


# def generate_product_id():
#     prefix = "PROD-"
#     next_product_id = '00001'

#     # Get Last Product Start With PROD-00001
#     last_product_id = Product.objects.filter(
#         product_id__startswith=prefix).order_by('product_id').last()

#     if last_product_id:
#         # Cut 5 digit from the Right and converted to int (PROD-:xxxxx)
#         last_product_id_four_digit = int(last_product_id.product_id[-5:])

#         # Increment one with last five digit
#         next_product_id = '{0:05d}'.format(last_product_id_four_digit + 1)

#     # Return custom product id number
#     return prefix + next_product_id


# class Category(models.Model):
#     status = models.BooleanField(default=True)
#     name = models.CharField(max_length=255)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'category'

#     def __str__(self):
#         return f"{self.name}"

    
# class Year(models.Model):
#     status = models.BooleanField(default=True)
#     year = models.CharField(max_length=255)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'year'

#     def __str__(self):
#         return f"{self.year}"



# class Product(models.Model):
#     product_id = models.CharField(
#         max_length=25, unique=True, default=generate_product_id)
#     status = models.BooleanField(default=True)
#     # product_type = models.CharField(max_length=25)
#     name = models.CharField(max_length=255)
#     product_code = models.CharField(max_length=25, unique=True)

#     category = models.ForeignKey(
#         Category, on_delete=models.DO_NOTHING, blank=True, null=True)
   
#     year = models.ForeignKey(
#         Year, on_delete=models.DO_NOTHING, blank=True, null=True)
   
#     # unit_quantity = models.CharField(max_length=25, blank=True, null=True)

#     # isFeatureProducts = models.BooleanField(default=False)
#     # isTopSellingProducts = models.BooleanField(default=False)
#     # isNewArrivalProducts = models.BooleanField(default=False)

#     # purchase_stock = models.IntegerField(default=0)
#     # purchase_price = models.DecimalField(
#     #     max_digits=10, decimal_places=2, default=0)
#     # initial_stock = models.IntegerField(default=0)
#     # regularPrice = models.DecimalField(
#     #     max_digits=10, decimal_places=2, default=0)
#     # discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     # specialPrice = models.DecimalField(
#     #     max_digits=10, decimal_places=2, default=0)

#     # sizes = models.JSONField(blank=True, null=True, default=list)
#     # colors = models.JSONField(blank=True, null=True, default=list)

#     thumbnail_image = models.ImageField(
#         upload_to='uploads/images/product/thumbnails', blank=True, null=True)
#     preview_image = models.ImageField(
#         upload_to='uploads/images/product/previews', blank=True, null=True)
   

#     description = models.TextField(blank=True, null=True)


#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'product'

#     def __str__(self):
#         return f"{self.name}"

#     def Description(self):
#         return truncatechars(self.description, 50)


#     def ThumbnailImage(self):
#         if self.thumbnail_image:
#             return mark_safe(
#                 '<img src="%s" alt="No Image" width="45" height="45" style="border-radius:10px" "/>' % self.thumbnail_image.url)
#         return 'No Image'
#     ThumbnailImage.short_description = 'Thumbnail Image'

#     def PreviewImage(self):
#         if self.preview_image:
#             return mark_safe(
#                 '<img src="%s" alt="No Image" width="45" height="45" style="border-radius:10px" "/>' % self.preview_image.url)
#         return 'No Image'
#     PreviewImage.short_description = 'Preview Image'

  
#     def save(self, *args, **kwargs):
#         if self.pk:
#             old_product = Product.objects.get(pk=self.pk)

#             get_initial_stock = self.initial_stock

#             if get_initial_stock > 0:
#                 self.purchase_stock = old_product.purchase_stock - get_initial_stock

#             if get_initial_stock > 0:
#                 self.initial_stock = old_product.initial_stock + get_initial_stock

#         super().save(*args, **kwargs)



from django.db import models
from django.utils import timezone
from .storage import private_storage


def generate_product_id():
    prefix = "PROD-"
    last_product = (
        Product.objects
        .filter(product_id__startswith=prefix)
        .order_by("product_id")
        .last()
    )

    next_number = (
        int(last_product.product_id[-5:]) + 1
        if last_product
        else 1
    )

    return f"{prefix}{next_number:05d}"


class Category(models.Model):
    status = models.BooleanField(default=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "category"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Year(models.Model):
    status = models.BooleanField(default=True)
    year = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "year"
        ordering = ["-year"]

    def __str__(self):
        return self.year


class License(models.Model):
    status = models.BooleanField(default=True)
    name = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "license"
        ordering = ["price", "name"]

    def __str__(self):
        return self.name
    

class Product(models.Model):
    product_id = models.CharField(
        max_length=25,
        unique=True,
        default=generate_product_id,
        editable=False,
    )

    status = models.BooleanField(default=True)
    name = models.CharField(max_length=255)
    product_code = models.CharField(max_length=25, unique=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
    )

    year = models.ForeignKey(
        Year,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
    )
    
    license = models.ForeignKey(
        License,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
    )

    # Clean image for Gallery and Home.
    thumbnail_image = models.ImageField(
        upload_to="uploads/images/product/thumbnails/",
        blank=True,
        null=True,
    )

    # Watermarked image for Product Details.
    preview_image = models.ImageField(
        upload_to="uploads/images/product/previews/",
        blank=True,
        null=True,
    )

    # Private original image; never expose its URL publicly.
    # original_image = models.ImageField(
    #     upload_to="products/originals/",
    #     blank=True,
    #     null=True,
    # )
    original_image = models.ImageField(
        storage=private_storage,
        upload_to="products/originals/",
        blank=True,
        null=True,
    )

    upload_date = models.DateField(default=timezone.localdate)
    premium = models.BooleanField(default=True)
    premium_text = models.CharField(
        max_length=255,
        default="Premium Content by Human & Horizon",
    )

    # Keep your existing product information.
    description = models.TextField(blank=True, null=True)


    # Preserve the formats and license structures used by your React app.
    formats = models.JSONField(default=list, blank=True)
    # licenses = models.JSONField(default=dict, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "product"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.product_id} - {self.name}"