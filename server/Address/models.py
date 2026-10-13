
from django.db import models
from django.utils.html import mark_safe
from django.template.defaultfilters import truncatechars


class Divisions(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=25)
    bn_name = models.CharField(max_length=25)
    url = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Divisions'

    def __str__(self):
        return f"{self.name}"
    
class Districts(models.Model):
    id = models.BigAutoField(primary_key=True)
    division = models.ForeignKey(Divisions, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=25)
    bn_name = models.CharField(max_length=25)
    lat = models.CharField(max_length=15)
    lon = models.CharField(max_length=15)
    url = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'districts'

    def __str__(self):
        return f"{self.name}"


class Upazilas(models.Model):
    id = models.BigAutoField(primary_key=True)
    district = models.ForeignKey(Districts, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=25)
    bn_name = models.CharField(max_length=25)
    url = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'upazilas'

    def __str__(self):
        return f"{self.name}"
    
    
class Unions(models.Model):
    id = models.BigAutoField(primary_key=True)
    upazila = models.ForeignKey(Upazilas, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=25)
    bn_name = models.CharField(max_length=25)
    url = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Unions'

    def __str__(self):
        return f"{self.name}"

