# Base Imports
import graphene

# Third Party Libraries
import graphql_geojson
from django_model_mutations import mutations, mixins
from graphene_django import DjangoObjectType

# Project Imports
from gamerooms import models as gamerooms_models
from gamerooms import serializers as gamerooms_serializers


# TYPES
class CountryType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Country


class StateType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.State


class CityType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.City
        geojson_field = 'city_latlong'


class CompanyType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Company


class GameCenterType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameCenter


class CategoryType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Category


class DifficultyLevelType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.DifficultyLevel


class GameRoomType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoom


class GameRoomCategoryType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoomCategory


gameroom_types = [CountryType, CityType, StateType, CompanyType, GameCenterType, CategoryType, DifficultyLevelType,
                  GameRoomType, GameRoomCategoryType]


# Country Mutations
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


# City Mutations
class CityCreateMutation(mutations.CreateModelMutation): #mixins.LoginRequiredMutationMixin,
    class Meta:
        serializer_class = gamerooms_serializers.CitySerializer
        #permissions = ('your_app.user_permission',) # OPTIONAL: specify user permissions


class CityUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.CitySerializer


class CityDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.City


# State Mutations
class StateCreateMutation(mutations.CreateModelMutation): #mixins.LoginRequiredMutationMixin,
    class Meta:
        serializer_class = gamerooms_serializers.StateSerializer
        #permissions = ('your_app.user_permission',) # OPTIONAL: specify user permissions


class StateUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.StateSerializer


class StateDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.State


# Company Mutations
class CompanyCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.CompanySerializer


class CompanyUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.CompanySerializer


class CompanyDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.Company


# GameCenter Mutations
class GameCenterCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.GameCenterSerializer


class GameCenterUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.GameCenterSerializer


class GameCenterDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.GameCenter


# Category Mutations
class CategoryCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.CategorySerializer


class CategoryUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.CategorySerializer


class CategoryDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.Category


# DifficultyLevel Mutations
class DifficultyLevelCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.DifficultyLevelSerializer


class DifficultyLevelUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.DifficultyLevelSerializer


class DifficultyLevelDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.DifficultyLevel


# GameRoom Mutations
class GameRoomCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.DifficultyLevelSerializer


class GameRoomUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.DifficultyLevelSerializer


class GameRoomDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.DifficultyLevel


# GameRoomCategory Mutations
class GameRoomCategoryCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.GameRoomCategorySerializer


class GameRoomCategoryUpdateMutation(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = gamerooms_serializers.GameRoomCategorySerializer


class GameRoomCategoryDeleteMutation(mutations.DeleteModelMutation):
    class Meta:
        model = gamerooms_models.GameRoomCategory




class GameRoomMutations(graphene.ObjectType,  types=gameroom_types):
    country_create = CountryCreateMutation.Field()
    country_update = CountryUpdateMutation.Field()
    country_delete = CountryDeleteMutation.Field()

    city_create = CityCreateMutation.Field()
    city_update = CityUpdateMutation.Field()
    city_delete = CityDeleteMutation.Field()

    state_create = StateCreateMutation.Field()
    state_update = StateUpdateMutation.Field()
    state_delete = StateDeleteMutation.Field()

    company_create = CompanyCreateMutation.Field()
    company_update = CompanyUpdateMutation.Field()
    company_delete = CompanyDeleteMutation.Field()

    game_center_create = GameCenterCreateMutation.Field()
    game_center_update = GameCenterUpdateMutation.Field()
    game_center_delete = GameCenterDeleteMutation.Field()

    category_create = CategoryCreateMutation.Field()
    category_update = CategoryUpdateMutation.Field()
    category_delete = CategoryDeleteMutation.Field()

    difficulty_level_create = DifficultyLevelCreateMutation.Field()
    difficulty_level_update = DifficultyLevelUpdateMutation.Field()
    difficulty_level_delete = DifficultyLevelDeleteMutation.Field()

    game_room_create = GameRoomCreateMutation.Field()
    game_room_update = GameRoomUpdateMutation.Field()
    game_room_delete = GameRoomDeleteMutation.Field()

    game_room_category_level_create = GameRoomCategoryCreateMutation.Field()
    game_room_category_update = GameRoomCategoryUpdateMutation.Field()
    game_room_category_delete = GameRoomCategoryDeleteMutation.Field()

    pass
