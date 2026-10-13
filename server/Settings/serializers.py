# from rest_framework import serializers
# from .models import GeneralSettings


# class GeneralSettingsSerializer(serializers.ModelSerializer):

#     company_logo = serializers.SerializerMethodField()

#     class Meta:
#         model = GeneralSettings
#         fields = "__all__"

#     def get_company_logo(self, obj):
#         request = self.context.get("request")
#         if obj.company_logo:
#             return request.build_absolute_uri(obj.company_logo.url)
#         return None


# class UnpaginateGeneralSettingsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeneralSettings
#         fields = "__all__"



from rest_framework import serializers
from .models import GeneralSettings, Courier, DeliveryType


class GeneralSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = GeneralSettings
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)

        request = self.context.get("request")

        if instance.company_logo and request:
            data["company_logo"] = request.build_absolute_uri(
                instance.company_logo.url
            )

        return data

class UnpaginateGeneralSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = GeneralSettings
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)

        request = self.context.get("request")

        if instance.company_logo and request:
            data["company_logo"] = request.build_absolute_uri(
                instance.company_logo.url
            )

        return data
    

class CourierSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    class Meta:
        model = Courier
        fields = '__all__'

class UnpaginateCourierSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    class Meta:
        model = Courier
        fields = '__all__'
    

class DeliveryTypeSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    class Meta:
        model = DeliveryType
        fields = '__all__'

class UnpaginateDeliveryTypeSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)

    class Meta:
        model = DeliveryType
        fields = '__all__'


