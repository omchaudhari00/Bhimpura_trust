from django.urls import path

from donors_app.views import DonorDetailView, DonorListCreateView

urlpatterns = [
    path("donors/", DonorListCreateView.as_view(), name="donor-list-create"),
    path("donors/<str:donor_id>/", DonorDetailView.as_view(), name="donor-detail"),
]
