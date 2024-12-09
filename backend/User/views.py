from django.shortcuts import render
from .models import *
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

class SignupView(generics.CreateAPIView):
    """
    View for user signup.
    """
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        """
        Handle POST request for user signup.
        """
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Save the user after validation
            serializer.save()
            return Response(
                {"message": "User created successfully."},
                status=status.HTTP_201_CREATED
            )
        else:
            # Return validation errors
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
