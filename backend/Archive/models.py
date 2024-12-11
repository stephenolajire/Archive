from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Archive(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    project_name = models.CharField(max_length=1000)
    department = models.CharField(max_length=200)
    discipline = models.CharField(max_length=200)
    faculty = models.CharField(max_length=200)
    front_page = models.ImageField(upload_to="image")
    project_file = models.FileField(upload_to="file")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.project_name
    
    class Meta:
        ordering = ['-created']
