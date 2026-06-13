from django.urls import path

from analytics_app.views import HomepageTrackView, HomepageVisitsView

urlpatterns = [
    path("homepage-visits/", HomepageVisitsView.as_view(), name="homepage-visits"),
    path("track/", HomepageTrackView.as_view(), name="homepage-track"),
]
