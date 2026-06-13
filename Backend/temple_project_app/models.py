from datetime import datetime, timezone

from bson import ObjectId

from core_api.database import get_db

UPDATE_POSTS_COLLECTION = "update_posts"
EVENT_PHOTOS_COLLECTION = "event_photos"


def serialize_update(doc):
    return {
        "id": str(doc["_id"]),
        "title": doc["title"],
        "description": doc["description"],
        "image_url": doc["image_url"],
        "created_at": doc["created_at"].isoformat(),
    }


def serialize_event_photo(doc):
    return {
        "id": str(doc["_id"]),
        "image_url": doc["image_url"],
        "uploaded_at": doc["uploaded_at"].isoformat(),
    }


class UpdatePost:
    @staticmethod
    def create(title, description, image_url):
        doc = {
            "title": title,
            "description": description,
            "image_url": image_url,
            "created_at": datetime.now(timezone.utc),
        }
        result = get_db()[UPDATE_POSTS_COLLECTION].insert_one(doc)
        doc["_id"] = result.inserted_id
        return doc

    @staticmethod
    def get_all():
        cursor = get_db()[UPDATE_POSTS_COLLECTION].find().sort("created_at", -1)
        return [serialize_update(doc) for doc in cursor]

    @staticmethod
    def get_by_id(post_id):
        doc = get_db()[UPDATE_POSTS_COLLECTION].find_one({"_id": ObjectId(post_id)})
        return serialize_update(doc) if doc else None

    @staticmethod
    def delete(post_id):
        result = get_db()[UPDATE_POSTS_COLLECTION].delete_one({"_id": ObjectId(post_id)})
        return result.deleted_count > 0


class EventPhoto:
    @staticmethod
    def create(image_url):
        doc = {
            "image_url": image_url,
            "uploaded_at": datetime.now(timezone.utc),
        }
        result = get_db()[EVENT_PHOTOS_COLLECTION].insert_one(doc)
        doc["_id"] = result.inserted_id
        return doc

    @staticmethod
    def get_all():
        cursor = get_db()[EVENT_PHOTOS_COLLECTION].find().sort("uploaded_at", -1)
        return [serialize_event_photo(doc) for doc in cursor]

    @staticmethod
    def get_by_id(photo_id):
        doc = get_db()[EVENT_PHOTOS_COLLECTION].find_one({"_id": ObjectId(photo_id)})
        return serialize_event_photo(doc) if doc else None

    @staticmethod
    def delete(photo_id):
        result = get_db()[EVENT_PHOTOS_COLLECTION].delete_one({"_id": ObjectId(photo_id)})
        return result.deleted_count > 0
