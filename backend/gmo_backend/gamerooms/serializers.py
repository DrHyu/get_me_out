# Base Imports

# Third Party Libraries
from rest_framework import serializers

# Project Imports
from gamerooms import models as gamerooms_models


class GameRoomSerializer(serializers.ModelSerializer):
    """The serializer for country model."""

    class Meta:
        model = gamerooms_models.GameRoom
        fields = '__all__'


class GameRoomVisitorRecomendationsSerializer(serializers.Serializer):
    country_id = serializers.IntegerField()