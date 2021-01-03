# Base Imports

# Third Party Libraries
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

# Project Imports


def endpoint_error_handling_decorator(function):
    def wrapper(*args, **kwargs):
        try:
            response = function(*args, **kwargs)
        except Http404:
            response = Response(status=status.HTTP_404_NOT_FOUND)
        except:
            response = Response(status=status.HTTP_400_BAD_REQUEST)

        return response

    return wrapper


def get_post_verify_serializer_decorator(function):
    def wrapper(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        response = Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            response = function(self, serializer, request, format)

        return response
    return wrapper