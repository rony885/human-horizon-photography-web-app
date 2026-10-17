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





from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

from django.conf import settings
from django.core.files.base import ContentFile
from django.db import models
from django.utils import timezone

from .storage import private_storage


# =========================================================
# GENERATE UNIQUE PRODUCT ID
# =========================================================

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


# =========================================================
# CATEGORY MODEL
# =========================================================

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


# =========================================================
# YEAR MODEL
# =========================================================

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


# =========================================================
# LICENSE MODEL
# =========================================================

class License(models.Model):
    status = models.BooleanField(default=True)

    name = models.CharField(max_length=255, unique=True)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "license"
        ordering = ["price", "name"]

    def __str__(self):
        return self.name


# =========================================================
# PRODUCT MODEL
# =========================================================

class Product(models.Model):

    product_id = models.CharField(
        max_length=25,
        unique=True,
        default=generate_product_id,
        editable=False,
    )

    status = models.BooleanField(default=True)

    name = models.CharField(max_length=255)

    product_code = models.CharField(
        max_length=25,
        unique=True,
    )

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

    # Clean thumbnail for the main product page.
    thumbnail_image = models.ImageField(
        upload_to="uploads/images/product/thumbnails/",
        blank=True,
        null=True,
    )

    # Watermarked preview for the product details page.
    preview_image = models.ImageField(
        upload_to="uploads/images/product/previews/",
        blank=True,
        null=True,
    )

    # Original image stored using private storage.
    original_image = models.ImageField(
        storage=private_storage,
        upload_to="products/originals/",
        blank=True,
        null=True,
    )

    upload_date = models.DateField(
        default=timezone.localdate,
    )

    premium = models.BooleanField(default=True)

    premium_text = models.CharField(
        max_length=255,
        default="Premium Content by Human & Horizon",
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    formats = models.JSONField(
        default=list,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "product"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.product_id} - {self.name}"

    # =====================================================
    # GENERATE WATERMARK
    # =====================================================

    @staticmethod
    def add_watermark(image):
        width, height = image.size

        overlay = Image.new(
            "RGBA",
            (width, height),
            (0, 0, 0, 0),
        )

        draw = ImageDraw.Draw(overlay)

        font_size = max(
            22,
            min(width, height) // 18,
        )

        font = None

        font_paths = [
            str(
                Path(settings.BASE_DIR)
                / "static"
                / "fonts"
                / "DejaVuSans.ttf"
            ),
            r"C:\Windows\Fonts\arial.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
        ]

        for font_path in font_paths:
            try:
                font = ImageFont.truetype(
                    font_path,
                    font_size,
                )
                break
            except OSError:
                continue

        if font is None:
            font = ImageFont.load_default()

        text = "Human & Hurizon"

        text_box = draw.textbbox(
            (0, 0),
            text,
            font=font,
            stroke_width=1,
        )

        text_width = text_box[2] - text_box[0]
        text_height = text_box[3] - text_box[1]

        spacing_x = max(text_width + 100, 200)
        spacing_y = max(text_height + 100, 150)

        # Repeat the watermark across the image.
        for y in range(-height, height * 2, spacing_y):
            for x in range(-width, width * 2, spacing_x):
                draw.text(
                    (x, y),
                    text,
                    font=font,
                    fill=(255, 255, 255, 115),
                    stroke_width=2,
                    stroke_fill=(0, 0, 0, 100),
                )

        # Rotate the watermark pattern.
        overlay = overlay.rotate(
            30,
            resample=Image.Resampling.BICUBIC,
            expand=True,
        )

        # Crop the rotated overlay back to image dimensions.
        left = (overlay.width - width) // 2
        top = (overlay.height - height) // 2

        overlay = overlay.crop(
            (left, top, left + width, top + height)
        )

        # Apply the watermark to the preview only.
        result = Image.alpha_composite(
            image.convert("RGBA"),
            overlay,
        ).convert("RGB")

        image.paste(result)

    # =====================================================
    # GENERATE CLEAN THUMBNAIL AND WATERMARKED PREVIEW
    # =====================================================

    def generate_preview_images(self):

        if not self.original_image:
            return

        # Read the original from storage.
        with self.original_image.open("rb") as source:
            with Image.open(source) as opened_image:
                opened_image.load()

                clean_image = ImageOps.exif_transpose(
                    opened_image
                ).convert("RGB")

        stem = Path(self.original_image.name).stem

        # -------------------------------------------------
        # 1. CLEAN THUMBNAIL
        # -------------------------------------------------

        thumbnail = clean_image.copy()

        thumbnail.thumbnail(
            (1000, 1000),
            Image.Resampling.LANCZOS,
        )

        thumbnail_buffer = BytesIO()

        thumbnail.save(
            thumbnail_buffer,
            format="JPEG",
            quality=90,
            optimize=True,
        )

        # -------------------------------------------------
        # 2. WATERMARKED PREVIEW
        # -------------------------------------------------

        preview = clean_image.copy()

        preview.thumbnail(
            (1600, 1600),
            Image.Resampling.LANCZOS,
        )

        self.add_watermark(preview)

        preview_buffer = BytesIO()

        preview.save(
            preview_buffer,
            format="JPEG",
            quality=90,
            optimize=True,
        )

        # -------------------------------------------------
        # 3. SAVE GENERATED FILES
        # -------------------------------------------------

        self.thumbnail_image.save(
            f"{stem}_thumbnail.jpg",
            ContentFile(thumbnail_buffer.getvalue()),
            save=False,
        )

        self.preview_image.save(
            f"{stem}_preview.jpg",
            ContentFile(preview_buffer.getvalue()),
            save=False,
        )

        # Release image resources.
        clean_image.close()
        thumbnail.close()
        preview.close()

    # =====================================================
    # AUTOMATIC SAVE
    # =====================================================

    def save(self, *args, **kwargs):

        # Detect a newly uploaded original image.
        generate_images = bool(
            self.original_image
            and not self.original_image._committed
        )

        # Save the product and original image first.
        super().save(*args, **kwargs)

        # Nothing else to generate if no new image was uploaded.
        if not generate_images:
            return

        # Generate the clean thumbnail and watermarked preview.
        self.generate_preview_images()

        # Save only the generated image fields.
        super().save(
            update_fields=[
                "thumbnail_image",
                "preview_image",
                "updated_at",
            ]
        )
