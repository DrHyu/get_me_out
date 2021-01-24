# Base Imports

# Third Party Libraries
from rest_framework import serializers

# Project Imports
from gamerooms import models as gamerooms_models


class CompanySerializer(serializers.ModelSerializer):
    """The serializer for the company model."""

    class Meta:
        model = gamerooms_models.GameCenter
        fields = '__all__'


class GameCenterSerializer(serializers.ModelSerializer):
    """The serializer for the game center model."""

    class Meta:
        model = gamerooms_models.GameCenter
        fields = '__all__'


class GameRoomSerializer(serializers.ModelSerializer):
    """The serializer for the game room model."""
    #game_center = GameCenterSerializer()

    class Meta:
        model = gamerooms_models.GameRoom
        fields = '__all__'


class GameRoomVisitorRecomendationsSerializer(serializers.Serializer):
    country_id = serializers.IntegerField()


class GameRoomSmartSearchSerializer(serializers.Serializer):
    country_id = serializers.IntegerField(required=False)
    state_id = serializers.IntegerField(required=False)
    city_id = serializers.IntegerField(required=False)
    num_players_min = serializers.IntegerField(required=False)
    num_players_max = serializers.IntegerField(required=False)

    rating_min = serializers.IntegerField(required=False)
    rating_max = serializers.IntegerField(required=False)

    #latitude = serializers.FloatField(required=False)
    #longitude = serializers.FloatField(required=False)
    #max_dist_meters = serializers.IntegerField(required=False)

    class Meta:
        fields = ('num_players')

