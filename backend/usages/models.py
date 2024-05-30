from datetime import datetime
from django.db import models
from pydantic import BaseModel, model_validator

class Unit(models.TextChoices):
    KWH = ("kWh", "Kilo Watt Hours")
    MWH = ("MWh", "Mega Watt Hours")
    GJ = ("GJ", "Giga Joules")

class CreateUsageInputPayload(BaseModel):
    quantity: float
    unit: Unit

class GetUsagesInputPayload(BaseModel):
    start: str 
    end: str 

class Usage(models.Model):
    quantity = models.DecimalField(decimal_places=5, max_digits=15)
    unit = models.CharField(
        max_length=200, choices=Unit, default=Unit.KWH
    )
    created_at = models.DateTimeField(auto_now_add=True)
