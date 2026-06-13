from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


class AdminJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        if "admin_id" not in validated_token:
            raise InvalidToken("Token is not a valid admin token.")
        return validated_token
