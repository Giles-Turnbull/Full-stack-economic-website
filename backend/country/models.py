from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

# CountryData model for storing the water quality data for each country
class CountryData(models.Model):
    pH = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(14)])
    EC = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(1000)])
    NH3 = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(15)])
    DO = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(20)])
    NO2_3 = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    T_P = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)])

# Country model for storing the country information and the water quality data for each country in the template
class Country(models.Model):
    name = models.CharField(max_length=255)
    access = models.BooleanField(default=False)
    vietnam_data = models.ForeignKey(CountryData, related_name='vietnam', on_delete=models.SET_NULL, null=True)
    thailand_data = models.ForeignKey(CountryData, related_name='thailand', on_delete=models.SET_NULL, null=True)
    cambodia_data = models.ForeignKey(CountryData, related_name='cambodia', on_delete=models.SET_NULL, null=True)
    laopdr_data = models.ForeignKey(CountryData, related_name='laopdr', on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, related_name='countries', default=1, on_delete=models.SET_NULL, null=True)