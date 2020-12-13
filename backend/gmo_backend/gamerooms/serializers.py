# Base Imports

# Third Party Libraries
from rest_framework import serializers

# Project Imports
from gamerooms import models as gamerooms_models


class GameRoomSerializer(serializers.ModelSerializer):
    """The serializer for the game room model."""

    class Meta:
        model = gamerooms_models.GameRoom
        fields = '__all__'


class GameCenterSerializer(serializers.ModelSerializer):
    """The serializer for the game center model."""

    class Meta:
        model = gamerooms_models.GameCenter
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    """The serializer for the company model."""

    class Meta:
        model = gamerooms_models.GameCenter
        fields = '__all__'


class GameRoomVisitorRecomendationsSerializer(serializers.Serializer):
    country_id = serializers.IntegerField()


class GameRoomRecomendationsSerializer(serializers.Serializer):
    country_id = serializers.IntegerField()


class GameRoomFilterSerializer(serializers.Serializer):
    pass
