# Base Imports

# Third Party Libraries
from django.urls import path

# Project Imports
from gamerooms import views as gamerooms_views


urlpatterns = [
    path('list_gamerooms', gamerooms_views.GameRoomListView.as_view()),
]