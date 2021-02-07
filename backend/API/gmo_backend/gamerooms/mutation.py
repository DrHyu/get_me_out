# Base Imports
import graphene

# Third Party Libraries
import graphql_geojson
from django_model_mutations import mutations, mixins
from graphene_django import DjangoObjectType

# Project Imports
from gamerooms import models as gamerooms_models
from gamerooms import serializers as gamerooms_serializers


class CountryType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Country


class CityType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.City
        geojson_field = 'city_latlong'


class CountryCreateMutation(mutations.CreateModelMutation): #mixins.LoginRequiredMutationMixin,
    class Meta:
        serializer_class = gamerooms_serializers.CountrySerializer
        #permissions = ('your_app.user_permission',) # OPTIONAL: specify user permissions


class CountryUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.CountrySerializer


class CountryDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.Country


gameroom_types = [CountryType, CityType]


class GameRoomMutations(graphene.ObjectType,  types=gameroom_types): #,
    country_create = CountryCreateMutation.Field()
    country_update = CountryUpdateMutation.Field()
    country_delete = CountryDeleteMutation.Field()
    pass