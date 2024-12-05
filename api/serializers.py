from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Include all fields except `last_login` and `is_superuser`
        fields = [
            "id", "username", "password", "first_name", "last_name", 
            "email"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        # Use `create_user` to handle password hashing
        user = User.objects.create_user(**validated_data)
        return user

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        # You can add extra validations if needed, like checking file types or limits

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        # You can add extra validations here for proof files (e.g., size, type, etc.)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'name', 'domain', 'linkedin_url', 'github_url', 'mail_id', 'phone_no', 'about' ,'profile_photo']
