from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken

from core_api.admins import HARD_CODED_ADMINS
from core_api.database import get_db


def authenticate_admin(email, password):
    admin = get_db().admins.find_one({"email": email.lower()})
    if admin and check_password(password, admin["password_hash"]):
        return admin
    return None


def create_admin_tokens(admin):
    refresh = RefreshToken()
    refresh["admin_id"] = str(admin["_id"])
    refresh["email"] = admin["email"]
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


def seed_hardcoded_admins():
    db = get_db()
    for admin in HARD_CODED_ADMINS:
        email = admin["email"].lower()
        db.admins.update_one(
            {"email": email},
            {
                "$set": {
                    "email": email,
                    "password_hash": make_password(admin["password"]),
                }
            },
            upsert=True,
        )
