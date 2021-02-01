import graphene
from movies.models import *
from .types import *

'''
class CreatePerson(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    ok = graphene.Boolean()
    person = graphene.Field(lambda: Person)

    def mutate(root, info, name):
        person = Person(name=name)
        ok = True
        return CreatePerson(person=person, ok=ok)


class CreateCategoryMutation(graphene.Mutation):
  class Input:
    name = graphene.String()

  @staticmethod
  def mutate(root, info, **kwargs):
    name = kwargs.get('name', '').strip()
    obj = Category.objects.create(name=name)
    return CreateCategoryMutation(name=obj)

    class CreateMovieMutation(graphene.Mutation):
  class Input(object):
    name = graphene.String()
    year = graphene.Int()
    rating = graphene.Int()
    category_id = graphene.Int()  name = graphene.Field(MovieType)  @staticmethod
  def mutate(root, info, **kwargs):
    name = kwargs.get('name', '').strip()
    year = kwargs.get('year', 0)
    rating = kwargs.get('rating', 0)
    category_id = kwargs.get('category_id', 0)    obj = Movie.objects.create(name=name,year=year,
            rating=rating,category_id=category_id)    return CreateMovieMutation(name=obj)class Mutation(graphene.AbstractType):
  create_category = CreateCategoryMutation.Field()
  create_movie = CreateMovieMutation.Field()
'''