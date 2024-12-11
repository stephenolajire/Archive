from django.urls import path
from .views import *

urlpatterns = [
    path("upload/", ArchiveView.as_view()),
    path("journals", GetArchiveView.as_view())
]