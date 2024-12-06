
from django.urls import path
from .views import*
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/', ProfileView.as_view()),
    path('attendance/', AttendanceView.as_view()),
    path('work-reports/', Workview.as_view(), name='work_report_create'),
    path('work-reports/<int:pk>/', WorkDetailView.as_view(), name='work-reports-detail'),
    path('course/', CourseView.as_view(), name='Course-list'),
    path('course/<int:pk>/', CourseDetailView.as_view(), name='Course-detail'),
    path('project/', ProjectView.as_view(), name='Project-list'),
    path('project/<int:pk>/', ProjectDetailView.as_view(), name='Project-detail'),
    path('profile/<str:username>/', ProfileView.as_view(), name='profile-detail'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)