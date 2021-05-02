# Base Imports

# Third Party Libraries
from graphene import ObjectType
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType

import graphql_geojson

# Project Imports
from users import models as users_models



class ReviewNode(DjangoObjectType):
    class Meta:
        model = users_models.Review
        filter_fields = ["gameroom", "user"]
        interfaces = (relay.Node, )


class LikedReviewNode(DjangoObjectType):
    class Meta:
        model = users_models.LikedReview
        filter_fields = ["user", "review"]
        interfaces = (relay.Node, )


class BookmarkedEscapeRoomNode(DjangoObjectType):
    class Meta:
        model = users_models.BookmarkedEscapeRoom
        filter_fields = ["user", "escape_room"]
        interfaces = (relay.Node, )


class UserStatsNode(DjangoObjectType):
    class Meta:
        model = users_models.UserStats
        filter_fields = ["user", "num_completed_escaperooms", "num_friends", "num_reviews"]
        interfaces = (relay.Node, )


class FriendshipNode(DjangoObjectType):
    class Meta:
        model = users_models.Friendship
        filter_fields = ["to_user", "from_user"]
        interfaces = (relay.Node, )


class FriendRequestNode(DjangoObjectType):
    class Meta:
        model = users_models.FriendRequest
        filter_fields = ["to_user", "from_user"]
        interfaces = (relay.Node, )


class UsersQuery(UserQuery, MeQuery, ObjectType):
    pass