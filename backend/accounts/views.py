from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class CustomAuthToken(ObtainAuthToken):
    # POST request to /api-token-auth/ will return a token
    def post(self, request, *args, **kwargs):
        # searializer_class class variable of ObtainAuthToken
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        # user object that is returned by the validate method of the serializer
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        # return the token and user info as a JSON object
        return Response({
            'token': token.key,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'user_id': user.pk,
            'email': user.email
        })
