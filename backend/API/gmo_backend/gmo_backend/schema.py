# Base Imports
import random

# Third Party Libraries
import graphene
from graphene import ObjectType

# Project Imports
from gamerooms import mutation as gameroom_mutations
from gamerooms import queries as gameroom_queries
from users import mutation as user_mutations
from users import queries as user_queries


class Mutations(gameroom_mutations.GameRoomMutations, user_mutations.UserMutations, graphene.ObjectType):
    pass


class Query(gameroom_queries.GameRoomQuery, user_queries.UsersQuery, ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutations)
