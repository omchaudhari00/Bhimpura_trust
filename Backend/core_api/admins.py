import os
import json
from dotenv import load_dotenv

load_dotenv()

HARD_CODED_ADMINS = []

# 1. Load single administrator from env (remote changes)
default_email = os.getenv("DEFAULT_ADMIN_EMAIL")
default_password = os.getenv("DEFAULT_ADMIN_PASSWORD")

if default_email and default_password:
    HARD_CODED_ADMINS.append({"email": default_email.lower(), "password": default_password})

# 2. Load multiple administrators from json list (our changes)
_admins_env = os.getenv("ADMINS_LIST")
if _admins_env:
    try:
        loaded_list = json.loads(_admins_env)
        for item in loaded_list:
            if "email" in item and "password" in item:
                HARD_CODED_ADMINS.append({"email": item["email"].lower(), "password": item["password"]})
    except Exception:
        pass

# 3. Fallback to default credentials for local testing if no env vars are defined
if not HARD_CODED_ADMINS:
    HARD_CODED_ADMINS = [
        {"email": "theom.chaudhari@gmail.com", "password": "Omsc@990"},
        {"email": "meetdudhat2805@gmail.com", "password": "Meet@28052004"},
        {"email": "vatsaldevani2005@gmail.com", "password": "iamvatsal2209"},
    ]
