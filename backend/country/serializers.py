from rest_framework import serializers
from .models import Country
from .models import CountryData
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']  # Include only the 'username' field

class CountryDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryData
        fields = '__all__'  # Include all fields from the CountryData model

class CountrySerializer(serializers.ModelSerializer):
    vietnam_data = CountryDataSerializer()  # Use CountryDataSerializer for nested data
    thailand_data = CountryDataSerializer()
    cambodia_data = CountryDataSerializer()
    laopdr_data = CountryDataSerializer()
    user = UserSerializer()  # Use UserSerializer for the 'user' field

    class Meta:
        model = Country
        fields = '__all__'  # Include all fields from the Country model


class CreateCountryDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryData
        fields = '__all__'


# File: country/serializers.py

class CreateCountrySerializer(serializers.ModelSerializer):
    vietnam_data = CreateCountryDataSerializer()
    thailand_data = CreateCountryDataSerializer()
    cambodia_data = CreateCountryDataSerializer()
    laopdr_data = CreateCountryDataSerializer()
    user = serializers.CharField()  # Accept username as a string

    class Meta:
        model = Country
        exclude = ['id']  # Exclude 'id' field from serialization

    def create(self, validated_data):
        vietnam_data = validated_data.pop('vietnam_data')
        thailand_data = validated_data.pop('thailand_data')
        cambodia_data = validated_data.pop('cambodia_data')
        laopdr_data = validated_data.pop('laopdr_data')

        # Retrieve the username from the validated data
        username = validated_data.pop('user')

        # Get the user instance or create it if it doesn't exist
        user, created = User.objects.get_or_create(username=username)

        # Print the serialized data for debugging
        country = Country.objects.create(user=user, **validated_data)

        # Create CountryData instances
        vietnam_data_instance = CountryData.objects.create(**vietnam_data)
        thailand_data_instance = CountryData.objects.create(**thailand_data)
        cambodia_data_instance = CountryData.objects.create(**cambodia_data)
        laopdr_data_instance = CountryData.objects.create(**laopdr_data)

        # Set the foreign key relationships
        country.vietnam_data = vietnam_data_instance
        country.thailand_data = thailand_data_instance
        country.cambodia_data = cambodia_data_instance
        country.laopdr_data = laopdr_data_instance

        country.save()

        return country
