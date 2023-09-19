from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, PrivateCountryViewSet, CreateNewCountry

# Create a router 
router = DefaultRouter()
router.register(r'countries', CountryViewSet)
router.register(r'private', PrivateCountryViewSet, basename='private-country')

urlpatterns = [
    # ... other URL patterns ...
    path('', include(router.urls)),
    path('save/', CreateNewCountry.as_view(), name='update-country-data'),  # Add this URL pattern
]
