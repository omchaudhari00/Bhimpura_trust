from core_api.database import get_db

SITE_STATS_COLLECTION = "site_stats"
HOMEPAGE_METRIC = "homepage_visits"


class SiteStats:
    @staticmethod
    def increment_homepage_visits():
        get_db()[SITE_STATS_COLLECTION].update_one(
            {"metric_name": HOMEPAGE_METRIC},
            {"$inc": {"total_count": 1}},
            upsert=True,
        )

    @staticmethod
    def get_homepage_visits():
        doc = get_db()[SITE_STATS_COLLECTION].find_one({"metric_name": HOMEPAGE_METRIC})
        return doc["total_count"] if doc else 0
