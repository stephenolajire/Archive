from rest_framework import serializers
from .models import Archive

class ArchiveSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Archive
        fields = ['user', 'id', 'project_name', 'project_file', 'front_page', 'discipline', 'faculty', 'department']

    def validate(self, attrs):
        required_fields = ['project_name', 'project_file', 'front_page', 'department', 'discipline', 'faculty']
        for field in required_fields:
            if not attrs.get(field):
                raise serializers.ValidationError({field: f"{field.replace('_', ' ')} cannot be empty"})
        return attrs
