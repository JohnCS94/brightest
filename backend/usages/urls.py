from django.urls import path

from usages.views import get_usages, create_usage

urlpatterns = [
     path("", get_usages, name="get_usages"),
     path("create/", create_usage, name="create_usages")
]
