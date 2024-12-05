from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from .models import *
from .serializers import *
import re

# Regex pattern for validating URLs (LinkedIn and GitHub)
URL_REGEX = re.compile(r"^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.+)*\/?$")

# SignUp API view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Profile View (For both GET and POST requests)
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def validate_url(self, url):
        """Validate if the provided URL is valid."""
        validator = URLValidator()
        try:
            validator(url)
            return True
        except ValidationError:
            return False

    def get(self, request, username=None):
        """Retrieve the profile for the given username or authenticated user."""
        if username is None:
            username = request.user.username

        try:
            profile = Profile.objects.get(user__username=username)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        """Create or update the profile for the authenticated user."""
        user = request.data.get("username")
        user_instance = User.objects.filter(username=user).first()  # Get the User instance

        if not user_instance:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        name = request.data.get('name')
        domain = request.data.get('domain')
        linkedin_url = request.data.get('linkedin_url')
        github_url = request.data.get('github_url')
        mail_id = request.data.get('mail_id')
        phone_no = request.data.get('phone_no')
        about = request.data.get('about')
        profile_photo = request.data.get('profile_photo')

        # Validate LinkedIn and GitHub URLs if provided
        if linkedin_url and not self.validate_url(linkedin_url):
            return Response({"error": "Invalid LinkedIn URL"}, status=status.HTTP_400_BAD_REQUEST)
        if github_url and not self.validate_url(github_url):
            return Response({"error": "Invalid GitHub URL"}, status=status.HTTP_400_BAD_REQUEST)

        # Create or update the profile
        profile, created = Profile.objects.update_or_create(
            user=user_instance,  # Pass the user instance
            defaults={
                'name': name,
                'domain': domain,
                'linkedin_url': linkedin_url,
                'github_url': github_url,
                'mail_id': mail_id,
                'phone_no': phone_no,
                'about': about,
                'profile_photo': profile_photo
                
            }
        )

        # Serialize and return the created or updated profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
