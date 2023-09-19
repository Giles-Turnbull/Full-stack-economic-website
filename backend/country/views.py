from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Country, CountryData
from .serializers import CountrySerializer, CreateCountrySerializer
from .permissions import IsOwnerOrReadOnly  # Import custom permission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Define a viewset for public access countries
class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.filter(access=True)
    serializer_class = CountrySerializer


# Define a viewset for private access countries
class PrivateCountryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CountrySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]  # Apply custom permission

    def get_queryset(self):
        user = self.request.user  # Get the current user
        return Country.objects.filter(access=False, user=user)

# Define a view for creating new countries
class CreateNewCountry(APIView):
    def post(self, request, format=None):
        serializer = CreateCountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)