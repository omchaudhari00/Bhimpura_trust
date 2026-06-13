from django.conf import settings

from analytics_app.models import SiteStats


class HomepageVisitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "GET" and request.path == settings.HOMEPAGE_TRACK_PATH:
            SiteStats.increment_homepage_visits()

        return self.get_response(request)
