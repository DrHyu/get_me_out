
# Base Imports
import random

# Third Party Libraries
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from django.http import Http404
from django.db.models import PositiveIntegerField, Value, ExpressionWrapper, F

from django.contrib.gis.db.models.functions import GeometryDistance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.http import Http404

# Project Imports
from gamerooms import serializers as gamerooms_serializers
from gamerooms import models as gamerooms_models


class GameRoomListView(ListAPIView):
    '''
        GameRooms List Endpoint
    '''
    serializer_class = gamerooms_serializers.GameRoomSerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()


class GameCenterListView(ListAPIView):
    '''
        GameCenters List Endpoint
    '''
    serializer_class = gamerooms_serializers.GameCenterSerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()


class CompanyListView(ListAPIView):
    '''
        Companies List Endpoint
    '''
    serializer_class = gamerooms_serializers.CompanySerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()

class GameRoomUserRecomendationsView(APIView):
    """
    """
    authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        user = request.user
        game_rooms = gamerooms_models.GameRoom.objects.all()
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
        serializer = gamerooms_serializers.GameRoomVisitorRecomendationsSerializer(data=request.data)

        if serializer.is_valid():
            country_id = serializer.validated_data['country_id']

            country = get_object(model=self.model, pk=country_id)
            game_rooms = gamerooms_models.objects.all()

            response = Response(game_rooms)
        else:
            response = Response(status=status.HTTP_400_BAD_REQUEST)

        return response


class GameRoomRecomendationsView(APIView):
    """
    """
    serializer_class = gamerooms_serializers.GameRoomSerializer

    def post(self, request, format=None):
        game_rooms = gamerooms_models.GameRoom.objects.values('game_room_id', 'name', 'rating').all()
        game_rooms = game_rooms.annotate(recommendation_score=F('rating') + random.uniform(0, 2))

        game_rooms = game_rooms.order_by('-recommendation_score')
        return Response(game_rooms)


def endpoint_error_handling_decorator(function):
    def wrapper(*args, **kwargs):
        try:
            response = function(*args, **kwargs)
        except Http404:
            response = Response(status=status.HTTP_404_NOT_FOUND)
        except:
            response = Response(status=status.HTTP_400_BAD_REQUEST)

        return response

    return wrapper



class GameRoomSmartSearchView(APIView):
    """
    """
    #authentication_classes = (TokenAuthentication,)
    serializer_class = gamerooms_serializers.GameRoomSerializer


    #@swagger_auto_schema(method='post', request_body=gamerooms_serializers.GameRoomSmartFilterSerializer)
    '''manual_parameters
    @swagger_auto_schema(method='post', request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'location_id': openapi.Schema(type=openapi.TYPE_STRING, description='Location Id'),
            #'location_text': openapi.Schema(type=openapi.TYPE_STRING, description='Location Text'),
            'num_players': openapi.Schema(type=openapi.TYPE_INTEGER, description='number of players'),
        }
    ))
    '''
    '''
    @swagger_auto_schema(method='post', manual_parameters=[
        openapi.Parameter('location_id', openapi.IN_QUERY, description="Location Id", type=openapi.TYPE_STRING),
        openapi.Parameter('num_players', openapi.IN_QUERY, description="Number of players", type=openapi.TYPE_STRING)
    ])'''

    #@swagger_auto_schema(method='post', request_body=gamerooms_serializers.GameRoomSmartFilterSerializer)

    @swagger_auto_schema(request_body=gamerooms_serializers.GameRoomSmartSearchSerializer)
    #@endpoint_error_handling_decorator
    def post(self, request, format=None):
        serializer = gamerooms_serializers.GameRoomSmartSearchSerializer(data=request.data, partial=True )
        if serializer.is_valid():
            # Verify Extra Input Errors
            lat_present = 'latitude' in serializer.validated_data
            long_present = 'longitude' in serializer.validated_data
            lat_long_pair_missmatch = (lat_present and not long_present) or (not lat_present and long_present)

            if lat_long_pair_missmatch:
                raise Http404

            # Smart Search
            game_rooms = gamerooms_models.GameRoom.objects.select_related('room_game_center')
            game_rooms = game_rooms.values('room_id', 'room_name', 'room_rating', 'room_min_players',
                                           'room_max_players', 'room_game_center__center_latlong'
                                           ).annotate(
                                            center_latlong=F('room_game_center__center_latlong')
                                           )

            if 'num_players_min' in serializer.validated_data:
                game_rooms = game_rooms.filter(room_min_players__lte=serializer.validated_data['num_players_min'])
            if 'num_players_max' in serializer.validated_data:
                game_rooms = game_rooms.filter(room_max_players__gte=serializer.validated_data['num_players_max'])
            if 'rating_min' in serializer.validated_data:
                game_rooms = game_rooms.filter(room_rating__lte=serializer.validated_data['rating_min'])
            if 'rating_max' in serializer.validated_data:
                game_rooms = game_rooms.filter(room_rating__gte=serializer.validated_data['rating_max'])

            if lat_present:
                query_latlong = Point(serializer.validated_data['latitude'], serializer.validated_data['longitude'], srid=3857)
                #game_rooms = game_rooms.annotate(distance=GeometryDistance('center_latlong', query_latlong))
                game_rooms = game_rooms.filter(center_latlong__distance_lt=(query_latlong, Distance(km=5)))

            #    max_dist = max(5000, serializer.validated_data['max_dist_meters'])
            #    print("IN GEOLOC 3")
            #    game_rooms = game_rooms.filter(distance__lte=max_dist)
            #    print("IN GEOLOC 4")

            game_rooms = game_rooms.values('room_id', 'room_name', 'room_rating', 'room_min_players', 'room_max_players')

            response = Response(game_rooms)
        else:
            raise Http404

        return response
