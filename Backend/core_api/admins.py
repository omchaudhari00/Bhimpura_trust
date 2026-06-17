import os
import json

_admins_env = os.getenv("ADMINS_LIST")
if _admins_env:
    try:
        HARD_CODED_ADMINS = json.loads(_admins_env)
    except Exception:
        HARD_CODED_ADMINS = [
            {"email": "theom.chaudhari@gmail.com", "password": "Omsc@990"},
            {"email": "meetdudhat2805@gmail.com", "password": "Meet@28052004"},
            {"email": "vatsaldevani2005@gmail.com", "password": "iamvatsal2209"},
        ]
else:
    HARD_CODED_ADMINS = [
        {"email": "theom.chaudhari@gmail.com", "password": "Omsc@990"},
        {"email": "meetdudhat2805@gmail.com", "password": "Meet@28052004"},
        {"email": "vatsaldevani2005@gmail.com", "password": "iamvatsal2209"},
    ]
