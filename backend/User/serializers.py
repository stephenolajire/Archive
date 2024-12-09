from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password"]

    def validate(self, attrs):
        if not attrs.get("first_name"):
            raise serializers.ValidationError("First name is required.")
        if not attrs.get("last_name"):
            raise serializers.ValidationError("Last name is required.")
        if not attrs.get("email"):
            raise serializers.ValidationError("Email is required.")
        if not attrs.get("password"):
            raise serializers.ValidationError("Password is required.")

        # Additional validations, e.g., password complexity
        password = attrs.get("password")
        if len(password) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")

        return attrs

    def create(self, validated_data):
        """
        Create a user instance after validation.
        """
        user = User.objects.create_user(
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            email=validated_data.get("email"),
            password=validated_data.get("password"),
        )
        return user
   