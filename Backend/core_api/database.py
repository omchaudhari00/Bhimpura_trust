from pymongo import MongoClient
from django.conf import settings


_client = None


def get_client():
    global _client
    if _client is None:
        _client = MongoClient(settings.MONGODB_URI)
    return _client


def get_db():
    return get_client()[settings.MONGODB_DB_NAME]
