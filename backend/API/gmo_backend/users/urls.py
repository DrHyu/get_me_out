# Base Imports

# Third Party Libraries
from rest_framework.authtoken import views as authviews
from rest_framework_simplejwt import views as jwt_views
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path

# Project Imports
#from users.views import *


urlpatterns = [
    path('auth/token/', authviews.obtain_auth_token),
    path('auth/jwt_token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/jwt_token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]