from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import ArchiveSerializer
from .models import Archive
from rest_framework.permissions import IsAuthenticated, AllowAny
from .paginations import CustomPagination
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class ArchiveView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArchiveSerializer

    def perform_create(self, serializer):
        # Associate the logged-in user with the Archive instance
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {"message": "Archive created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Validation error", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

class GetArchiveView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ArchiveSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        # Define your queryset logic
        return Archive.objects.all()

    def get_serializer_context(self):
        # Add request to serializer context
        return {"request": self.request}
    

class GetJournalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = request.user
        
        # Safely retrieve the journal or return a 404 if not found
        journal = get_object_or_404(Archive, id=id)
        
        # Check if the user is the author of the journal
        if journal.user == user:
            # Use the serializer to format the response
            serializer = ArchiveSerializer(journal)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # If the user is not the author, return a 403 Forbidden
            return Response(
                {"error": "You are not authorized to view this journal."}, 
                status=status.HTTP_403_FORBIDDEN
            )  


class UpdateArchiveView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all()

    def perform_update(self, serializer):
        # Optionally, you can add custom logic here, such as associating the logged-in user.
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # The default behavior of UpdateAPIView handles the update process.
        instance = self.get_object()  # Retrieve the instance to update
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            self.perform_update(serializer)  # Save the updated data
            return Response(
                {"message": "Archive updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        
        return Response(
            {"message": "Validation error", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )    


class JournalsByFacultyView(generics.ListAPIView):
    serializer_class = ArchiveSerializer

    def get_queryset(self):
        # Get faculty name from URL parameter
        faculty_name = self.kwargs.get('faculty_name', '').lower()
        print (faculty_name)
        
        # Case-insensitive filter
        return Archive.objects.filter(faculty__iexact=faculty_name)