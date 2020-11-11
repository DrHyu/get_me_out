
# Base Imports

# Third Party Libraries
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from django.http import Http404


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


def get_object(model, pk):
    try:
        object_ = model.objects.get(pk=pk)
    except model.DoesNotExist:
        raise Http404
    return object_


class GameRoomVisitorRecomendationsView(APIView):
    """
    """

    def get(self, request, format=None):
        serializer = GameRoomVisitorRecomendationsSerializer(data=request.data)

        if serializer.is_valid():
            country_id = serializer.validated_data['country_id']

            country = get_object(model=self.model, pk=country_id)
            game_rooms = gamerooms_models.objects.all()

            response = Response(game_rooms)
        else:
            response = Response(status=status.HTTP_400_BAD_REQUEST)

        return response