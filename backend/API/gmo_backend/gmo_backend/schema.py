# Base Imports

# Third Party Libraries
import graphene
from graphene import relay, AbstractType, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import graphql_geojson

# Project Imports
from gamerooms import models as gamerooms_models

'''
class CompanyType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Company
        #fields = ("company_id", "name", "description", "telephone")
        #interfaces = (relay.Node,)
        #filter_fields = ['company_id']


class GameCenterType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameCenter
        #fields = ("center_id", "company", "description", "location")
        #interfaces = (relay.Node,)
        #filter_fields = ['center_id']


class GameRoomType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoom
        #fields = ("id", "name", "description", "img", "rating", "open", "game_center", "completions")


class CompletionType(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Completion
        #fields = ("gameroom", "user", "review_text", "general_score")

class Query(graphene.ObjectType):
    companies = graphene.List(CompanyType)
    game_center = graphene.List(GameCenterType)
    game_room = graphene.List(GameRoomType)
    #completion = graphene.List(CompletionType)

    def resolve_companies(self, context, **kwargs):
        return gamerooms_models.Company.objects.all()

    def resolve_game_center(self, context, **kwargs):
        return gamerooms_models.GameCenter.objects.all()

    def resolve_game_room(self, context, **kwargs):
        return gamerooms_models.GameRoom.objects.all()


schema = graphene.Schema(query=Query)
'''


class CountryNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.Country
        filter_fields = ["company_id", "country_name"]
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
                         "room_min_players", "room_max_players", "related_categories"]
        interfaces = (relay.Node, )


class GameRoomCategoryNode(DjangoObjectType):
    class Meta:
        model = gamerooms_models.GameRoomCategory
        filter_fields = ["gameroom", "category"]
        interfaces = (relay.Node, )


class Query(ObjectType):
    #game_room = relay.Node.Field(GameRoomNode)
    countries = DjangoFilterConnectionField(CountryNode)
    states = DjangoFilterConnectionField(StateNode)
    cities = DjangoFilterConnectionField(CityNode)
    companies = DjangoFilterConnectionField(CompanyNode)
    game_centers = DjangoFilterConnectionField(GameCenterNode)
    categories = DjangoFilterConnectionField(CategoryNode)
    game_rooms = DjangoFilterConnectionField(GameRoomNode)
    #game_rooms = DjangoFilterConnectionField(GameRoomNode)


schema = graphene.Schema(query=Query)








