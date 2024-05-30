from rest_framework import serializers
from .models import Usage

class UsageSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Usage
        fields = "__all__"