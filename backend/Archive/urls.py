from django.urls import path
from .views import *

urlpatterns = [
    path("upload/", ArchiveView.as_view()),
    path("journals", GetArchiveView.as_view()),
    path('journal/<str:id>/', GetJournalView.as_view()),
    path('edit/<int:pk>/', UpdateArchiveView.as_view(), name='update-archive'),
    path('journals/faculty/<str:faculty_name>/', JournalsByFacultyView.as_view(), name='journals-by-faculty'),
]