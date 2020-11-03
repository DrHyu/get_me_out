
# Base Imports

# Third Party Libraries
from rest_framework.generics import ListAPIView

# Project Imports
from gamerooms.serializers import GameRoomSerializer


class GameRoomListView(ListAPIView):
    '''
        GameRoom List Endpoint
    '''
    serializer_class = GameRoomSerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()