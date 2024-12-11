from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import ArchiveSerializer
from .models import Archive
from rest_framework.permissions import IsAuthenticated, AllowAny
from .paginations import CustomPagination

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
