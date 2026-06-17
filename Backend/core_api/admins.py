import os
from dotenv import load_dotenv

load_dotenv()

HARD_CODED_ADMINS = []

default_email = os.getenv("DEFAULT_ADMIN_EMAIL")
default_password = os.getenv("DEFAULT_ADMIN_PASSWORD")

if default_email and default_password:
    HARD_CODED_ADMINS.append({"email": default_email, "password": default_password})
