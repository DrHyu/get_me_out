# Base Imports

# Third Party Libraries
from django.urls import path

# Project Imports
from gamerooms import views as gamerooms_views


urlpatterns = [
    path('list_gamerooms', gamerooms_views.GameRoomListView.as_view()),
    path('user_gameroom_recomendation', gamerooms_views.GameRoomUserRecomendationsView.as_view()),
    path('visitor_gameroom_recomendation', gamerooms_views.GameRoomVisitorRecomendationsView.as_view()),
]