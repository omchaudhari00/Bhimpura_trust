from django.urls import include, path

from core_api.views import AdminLoginView

urlpatterns = [
    path("api/auth/login/", AdminLoginView.as_view(), name="admin-login"),
    path("api/", include("temple_project_app.urls")),
    path("api/", include("donors_app.urls")),
    path("api/analytics/", include("analytics_app.urls")),
]
