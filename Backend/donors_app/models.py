from datetime import datetime, timezone

from bson import ObjectId

from core_api.database import get_db

DONORS_COLLECTION = "donors"


def serialize_donor(doc):
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "amount_donated": doc.get("amount_donated", 0),
        "village": doc.get("village", ""),
        "current_place": doc.get("current_place", ""),
        "photo_url": doc["photo_url"],
        "added_on": doc["added_on"].isoformat(),
    }


class Donor:
    @staticmethod
    def create(name, amount_donated, village, current_place, photo_url):
        doc = {
            "name": name,
            "amount_donated": amount_donated,
            "village": village,
            "current_place": current_place,
            "photo_url": photo_url,
            "added_on": datetime.now(timezone.utc),
        }
        result = get_db()[DONORS_COLLECTION].insert_one(doc)
        doc["_id"] = result.inserted_id
        return doc

    @staticmethod
    def get_all():
        cursor = get_db()[DONORS_COLLECTION].find().sort("amount_donated", -1)
        return [serialize_donor(doc) for doc in cursor]

    @staticmethod
    def delete(donor_id):
        result = get_db()[DONORS_COLLECTION].delete_one({"_id": ObjectId(donor_id)})
        return result.deleted_count > 0
