
# Base Imports

# Third Party Libraries
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication

# Project Imports
from gamerooms.serializers import GameRoomSerializer, GameRoomVisitorRecomendationsSerializer
from gamerooms import models as gamerooms_models


class GameRoomListView(ListAPIView):
    '''
        GameRoom List Endpoint
    '''
    serializer_class = GameRoomSerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()


class GameRoomUserRecomendationsView(APIView):
    """
    """
    authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        user = request.user
        game_rooms = gamerooms_models.objects.all()
        return Response(game_rooms)


class GameRoomVisitorRecomendationsView(APIView):
    """
    """

    def get(self, request, format=None):
        serializer = GameRoomVisitorRecomendationsSerializer(data=request.data)

        if serializer.is_valid():
            response = Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            response = Response(status=status.HTTP_400_BAD_REQUEST)

        return response