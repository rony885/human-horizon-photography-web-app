from rest_framework import serializers

from .models import Divisions, Districts, Upazilas, Unions


class DivisionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Divisions 
        fields = '__all__'
        
        
class DistrictsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Districts
        fields = '__all__'


class UpazilasSerializer(serializers.ModelSerializer):

    class Meta:
        model = Upazilas
        fields = '__all__'
        
        
class UnionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unions
        fields = '__all__'