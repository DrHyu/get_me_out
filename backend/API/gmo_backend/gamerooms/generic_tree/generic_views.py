# Base Imports

# Third Party Libraries
from rest_framework.generics import ListAPIView, GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, \
                                    CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import TokenAuthentication

# Project Imports


class ParametrizedAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    pagination_class = None


class GenericListView(ListAPIView, ParametrizedAPIView):
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class GenericListCreateView(ListCreateAPIView, ParametrizedAPIView):
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class GenericPkView(RetrieveUpdateDestroyAPIView, ParametrizedAPIView):
    pass


class GenericAPIViewParametrized(GenericAPIView, ParametrizedAPIView):
    pass