# Base Imports

# Third Party Libraries
from django.http import Http404

# Project Imports


def get_object(model, pk):
    try:
        object_ = model.objects.get(pk=pk)
    except model.DoesNotExist:
        raise Http404
    return object_