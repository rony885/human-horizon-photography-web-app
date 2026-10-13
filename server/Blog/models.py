
from django.db import models
from django.utils.html import mark_safe
from django.template.defaultfilters import truncatechars


def generate_blog_id():
    prefix = "BLOG-"
    next_blog_id = '00001'

    # Get Last Blog Start With BLOG-
    last_blog_id = Blog.objects.filter(
        blog_id__startswith=prefix).order_by('blog_id').last()

    if last_blog_id:
        # Cut 5 digit from the Right and converted to int (BLOG-:xxxx)
        last_blog_id_four_digit = int(last_blog_id.blog_id[-5:])

        # Increment one with last five digit
        next_blog_id = '{0:05d}'.format(last_blog_id_four_digit + 1)

    # Return custom blog id number
    return prefix + next_blog_id


class Blog(models.Model):
    blog_id = models.CharField(
        max_length=25, unique=True, default=generate_blog_id)
    status = models.BooleanField(default=True)
    title = models.CharField(max_length=255)
    # subtitle = models.CharField(max_length=255)
    pub_date = models.DateField(auto_now=True)
    pub_time = models.TimeField(auto_now=True)
    author = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to='uploads/images/blog', blank=True, null=True)
    comments = models.PositiveIntegerField(default=0)
    # views = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'blog'

    def __str__(self):
        return f"{self.title}"

    def Description(self):
        return truncatechars(self.description, 50)

    def Image(self):
        if self.image:
            return mark_safe(
                '<img src="%s" alt="No Image" width="45" height="45" style="border-radius:10px" "/>' % self.image.url)
        return 'No Image'
    Image.short_description = 'Blog Image'
