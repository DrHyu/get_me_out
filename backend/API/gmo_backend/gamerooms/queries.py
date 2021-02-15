# Base Imports
import random

# Third Party Libraries
import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.db.models import F
from graphql_auth.schema import UserQuery, MeQuery

# Project Imports
from gamerooms import models as gamerooms_models


class CountryNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Country
        filter_fields = ["country_id", "country_name"]
        interfaces = (relay.Node, )


class StateNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.State
        filter_fields = ["state_id", "state_name", "state_country"]
        interfaces = (relay.Node, )


class CityNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.City
        filter_fields = ["city_id", "city_name", "city_country", "city_state"] #, "city_latlong"
        interfaces = (relay.Node, )


class CompanyNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Company
        filter_fields = ["company_id", "company_name", "company_description", "company_telephone"]
        interfaces = (relay.Node, )


class GameCenterNode(DjangoObjectType): #graphql_geojson.GeoJSONType
    class Meta:
        model = gamerooms_models.GameCenter
        filter_fields = ["center_id", "center_company", "center_description"]
        interfaces = (relay.Node, )
        #geojson_field = "center_latlong"


class CategoryNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Category
        filter_fields = ["category_id", "category_name"]
        interfaces = (relay.Node, )


class GameRoomNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoom
        filter_fields = ["room_id", "room_name", "room_description", "room_img", "room_rating", "room_game_center",
                         "room_min_players", "room_max_players"] #, "related_categories"
        interfaces = (relay.Node, )

    #room_id = graphene.Int(source='room_id')


class GameRoomType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoom


class GameRoomCategoryNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoomCategory
        filter_fields = ["gameroom", "category"]
        interfaces = (relay.Node, )


class DifficultyLevelNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.DifficultyLevel
        filter_fields = ["difficulty_id", "difficulty_name"]
        interfaces = (relay.Node, )


class GameRoomQuery(UserQuery, MeQuery, ObjectType):
    countries = DjangoFilterConnectionField(CountryNode)
    states = DjangoFilterConnectionField(StateNode)
    cities = DjangoFilterConnectionField(CityNode)
    companies = DjangoFilterConnectionField(CompanyNode)
    game_centers = DjangoFilterConnectionField(GameCenterNode)
    categories = DjangoFilterConnectionField(CategoryNode)
    game_rooms = DjangoFilterConnectionField(GameRoomNode)
    difficulty_levels = DjangoFilterConnectionField(DifficultyLevelNode)
    game_room_recommendation = graphene.List(GameRoomType)
    game_room_search = graphene.List(GameRoomType,
                                     country_id=graphene.Int(required=False),
                                     state_id=graphene.Int(required=False),
                                     city_id=graphene.Int(required=False),
                                     num_players_min=graphene.Int(required=False),
                                     num_players_max=graphene.Int(required=False),
                                     rating_min=graphene.Float(required=False),
                                     rating_max=graphene.Float(required=False),
                                     difficulty_levels=graphene.List(graphene.Int, required=False),
                                     categories=graphene.List(graphene.Int, required=False),
                                     price_min=graphene.Float(required=False),
                                     price_max=graphene.Float(required=False))

    def resolve_game_room_recommendation(self, info, **kwargs):
        game_rooms = gamerooms_models.GameRoom.objects.all()  # .values('room_id', 'room_name', 'room_rating').all()
        game_rooms = game_rooms.annotate(recommendation_score=F('room_rating') + random.uniform(0, 2))

        game_rooms = game_rooms.order_by('-recommendation_score')
        # game_rooms = game_rooms.values('room_id', 'room_name', 'room_rating')

        # game_rooms = game_rooms.values('room_id', 'room_name', 'room_description', 'room_img', 'room_rating',
        #                               'room_game_center', 'room_min_players', 'room_max_players',
        #                               'room_related_categories', 'room_difficulty_level', 'room_price')

        return game_rooms

    def resolve_game_room_search(self, info, **kwargs):
        game_rooms = gamerooms_models.GameRoom.objects.select_related('room_game_center')

        game_rooms = game_rooms.all().annotate(
            country_id=F('room_game_center__center_city__city_country'),
            state_id=F('room_game_center__center_city__city_state'),
            city_id=F('room_game_center__center_city__city_id')
        )
        #

        if 'difficulty_levels' in kwargs:
            game_rooms = game_rooms.filter(room_difficulty_level__in=kwargs['difficulty_levels'])

        if 'categories' in kwargs:
            game_rooms = game_rooms.filter(room_related_categories__in=kwargs['categories'])

        if 'country_id' in kwargs:
            game_rooms = game_rooms.filter(country_id=kwargs['country_id'])

        if 'state_id' in kwargs:
            game_rooms = game_rooms.filter(state_id=kwargs['state_id'])

        if 'city_id' in kwargs:
            game_rooms = game_rooms.filter(city_id=kwargs['city_id'])

        if 'price_min' in kwargs:
            game_rooms = game_rooms.filter(room_price__gte=kwargs['price_min'])

        if 'price_max' in kwargs:
            game_rooms = game_rooms.filter(room_price__lte=kwargs['price_max'])

        if 'num_players_min' in kwargs:
            game_rooms = game_rooms.filter(room_min_players__lte=kwargs['num_players_min'])

        if 'num_players_max' in kwargs:
            game_rooms = game_rooms.filter(room_max_players__gte=kwargs['num_players_max'])

        if 'rating_min' in kwargs:
            game_rooms = game_rooms.filter(room_rating__gte=kwargs['rating_min'])

        if 'rating_max' in kwargs:
            game_rooms = game_rooms.filter(room_rating__lte=kwargs['rating_max'])

        return game_rooms