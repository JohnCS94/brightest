from django.contrib import admin
from usages.models import Usage

@admin.register(Usage)
class UsageAdmin(admin.ModelAdmin):
    list_display = [
        "quantity",
        "unit",
        "created_at"
    ]