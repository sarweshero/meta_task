from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from django.conf import settings
from django.conf.urls.static import static
from api.views import AdminLoginView, StudentLoginView, GoogleOAuthView, GoogleOAuthRegisterView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/admin/login/", AdminLoginView.as_view(), name="admin_login"),
    path("api/student/login/", StudentLoginView.as_view(), name="student_login"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    path("api/auth/google/", GoogleOAuthView.as_view(), name="google-oauth"),
    path('auth/google/register/', GoogleOAuthRegisterView.as_view(), name='google-oauth-register'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)