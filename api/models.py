from django.db import models
from django.contrib.auth.models import User


class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="attendance", null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    time = models.DateTimeField(auto_now_add=True, null=True)


# Course Table
class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses", null=True)
    course_name = models.CharField(max_length=100, null=True)
    platform = models.CharField(max_length=100, null=True)
    certificate = models.FileField(upload_to='certificates/', null=True, default='certificates/default_certificate.pdf')

#work reports
class work(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="work", null=True)
    title = models.CharField(max_length=500)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.title
    
# Project Table
class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects", null=True)
    project_title = models.CharField(max_length=150, null=True)
    description = models.TextField(null=True)
    proof = models.FileField(upload_to='projects/', null=True, default='projects/default_proof.pdf')

   

# Profile Table
class Profile(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name="profile", 
        null=True
    )
    name = models.CharField(max_length=100, null=True)
    domain = models.CharField(max_length=100, null=True)
    linkedin_url = models.URLField(null=True)
    github_url = models.URLField(null=True)
    mail_id = models.EmailField(null=True)
    phone_no = models.CharField(max_length=15, null=True)
    profile_photo = models.ImageField(
        upload_to='profiles/', 
        null=True, 
        default='profiles/default_profile.png'
    )
    about = models.TextField(null=True)
