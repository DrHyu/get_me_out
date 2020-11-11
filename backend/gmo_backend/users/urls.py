# Base Imports

# Third Party Libraries
from rest_framework.authtoken import views as authviews
from django.urls import path

# Project Imports
#from users.views import *


urlpatterns = [
    path('auth/login', authviews.obtain_auth_token),
]