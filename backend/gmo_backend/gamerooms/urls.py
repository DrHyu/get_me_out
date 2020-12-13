# Base Imports

# Third Party Libraries
from django.urls import path

# Project Imports
from gamerooms import views as gamerooms_views


urlpatterns = [
    path('public/gamerooms', gamerooms_views.GameRoomListView.as_view()),
    #path('public/gamecenters', gamerooms_views.GameCenterListView.as_view()),
    #path('public/companies', gamerooms_views.CompanyListView.as_view()),
    #path('public/recommendation/user_gameroom_recomendation', gamerooms_views.GameRoomUserRecomendationsView.as_view()),
    #path('private/recommendation/visitor_gameroom_recomendation', gamerooms_views.GameRoomVisitorRecomendationsView.as_view()),
    path('game_room/recomendations', gamerooms_views.GameRoomRecomendationsView.as_view())
]