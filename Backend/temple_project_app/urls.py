from django.urls import path

from temple_project_app.views import (
    EventPhotoDetailView,
    EventPhotoDownloadView,
    EventPhotoListCreateView,
    UpdatePostDetailView,
    UpdatePostListCreateView,
)

urlpatterns = [
    path("updates/", UpdatePostListCreateView.as_view(), name="update-list-create"),
    path("updates/<str:post_id>/", UpdatePostDetailView.as_view(), name="update-detail"),
    path("event-photos/", EventPhotoListCreateView.as_view(), name="event-photo-list-create"),
    path("event-photos/<str:photo_id>/", EventPhotoDetailView.as_view(), name="event-photo-detail"),
    path(
        "event-photos/<str:photo_id>/download/",
        EventPhotoDownloadView.as_view(),
        name="event-photo-download",
    ),
]
