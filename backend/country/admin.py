from django.contrib import admin
from .models import Country, CountryData

# defining the admin interface for the CountryData model
class CountryDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'pH', 'EC', 'NH3', 'DO', 'NO2_3', 'T_P')
    list_filter = ('pH', 'EC', 'NH3', 'DO', 'NO2_3', 'T_P')
    search_fields = ('id',)

# defining the admin interface for the Country model
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'access', 'vietnam_data', 'thailand_data', 'cambodia_data', 'laopdr_data')
    list_filter = ('access',)
    search_fields = ('id', 'name')
    # Add this fieldsets definition to include related CountryData fields.
    fieldsets = (
        ('Country Information', {
            'fields': ('name', 'access')
        }),
        ('Country Data', {
            'fields': ('vietnam_data', 'thailand_data', 'cambodia_data', 'laopdr_data')
        }),
    )

# Registering the models with the admin interface
admin.site.register(CountryData, CountryDataAdmin)
admin.site.register(Country, CountryAdmin)
