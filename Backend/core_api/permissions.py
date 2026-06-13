from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        token = request.auth
        return token is not None and "admin_id" in token
