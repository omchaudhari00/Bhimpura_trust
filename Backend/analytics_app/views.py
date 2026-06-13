from rest_framework.response import Response
from rest_framework.views import APIView

from analytics_app.models import SiteStats
from core_api.permissions import IsAdminUser


class HomepageVisitsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({"total_count": SiteStats.get_homepage_visits()})


class HomepageTrackView(APIView):
    def get(self, request):
        return Response({"status": "ok"})
