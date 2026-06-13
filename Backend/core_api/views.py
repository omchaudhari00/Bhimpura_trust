from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core_api.auth import authenticate_admin, create_admin_tokens


class AdminLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        admin = authenticate_admin(email, password)
        if not admin:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(create_admin_tokens(admin))
