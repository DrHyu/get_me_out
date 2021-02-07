# Base Imports

# Third Party Libraries
from graphene import ObjectType
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
import graphql_geojson

# Project Imports


class UsersQuery(UserQuery, MeQuery, ObjectType):
    pass