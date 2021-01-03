# Base Imports

# Third Party Libraries
from rest_framework.response import Response
from rest_framework import status

# Project Imports
from .functions import get_object
from .generic_views import ParametrizedAPIView, GenericAPIViewParametrized, ListAPIView, RetrieveAPIView, GenericAPIView
from .decorators import endpoint_error_handling_decorator, get_post_verify_serializer_decorator
from .serializers import MergeTreeAPIViewSerializer


class ListCreateTreeAPIView(ListAPIView, ParametrizedAPIView):
    """
            Generic view for tree-structure-like models.
    """
    model = None

    @endpoint_error_handling_decorator
    @get_post_verify_serializer_decorator
    def post(self, serializer, request, format=None):

        if 'parent' in serializer.validated_data:
            parent = get_object(model=self.model, pk=serializer['parent'].value)
            create_args = {
                'name': serializer['name'].value,
                'parent': parent,
                'full_path': parent.full_path + '|' + serializer['name'].value
            }
        else:
            create_args = {
                'name': serializer['name'].value,
                'full_path': serializer['name'].value
            }

        self.model.objects.create(**create_args)
        return Response(status=status.HTTP_201_CREATED)


def full_path_change(model, current_full_path, new_full_path):
    for element in model.objects.filter(full_path__startswith=current_full_path):
        tail = element.full_path[len(current_full_path):len(element.full_path)]
        element.full_path = new_full_path + tail
        element.save(update_fields=['full_path'])

    return None


class RetrieveModifyDeleteTreeAPIView(RetrieveAPIView, ParametrizedAPIView):
    """
            Generic view for tree-structure-like models.
    """
    model = None
    serializer_class = None

    @endpoint_error_handling_decorator
    def patch(self, request, pk, format=None):
        element = get_object(model=self.model, pk=pk)
        serializer = self.serializer_class(element, data=request.data, partial=True)
        response = Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            # Define current full path, parent full path and grandparents full path
            current_full_path = element.full_path

            if "name" in serializer.validated_data:
                element.name = serializer.validated_data['name']

            if "parent" in serializer.validated_data:
                element.parent = serializer.validated_data['parent']

            if element.parent.full_path == "":
                new_full_path = element.name
            else:
                new_full_path = element.parent.full_path + '|' + element.name

            # Update current element
            element.save()

            # Update self and descendants full path
            full_path_change(model=self.model,
                             current_full_path=current_full_path,
                             new_full_path=new_full_path)

            response = Response(status=status.HTTP_200_OK)

        return response

    def delete(self, request, pk, format=None):
        element = get_object(model=self.model, pk=pk)
        num_children = self.model.objects.filter(parent=element).count()

        if num_children == 0:
            element.delete()
            response = Response(status=status.HTTP_200_OK)
        else:
            response = Response(status=status.HTTP_400_BAD_REQUEST)

        return response


class MergeTreeAPIView(GenericAPIView):
    """
            The view for the merge tree functionality.
    """
    model = None
    serializer_class = MergeTreeAPIViewSerializer

    @endpoint_error_handling_decorator
    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        response = Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():

            element_merge_to = get_object(model=self.model, pk=serializer.validated_data['id_merge_to'])
            element_merge_from = get_object(model=self.model, pk=serializer.validated_data['id_merge_from'])
            self.model.objects.filter(parent=element_merge_from).update(parent=element_merge_to)

            current_full_path = element_merge_from.full_path
            new_full_path = element_merge_to.full_path

            element_merge_from.delete()

            full_path_change(model=self.model,
                             current_full_path=current_full_path,
                             new_full_path=new_full_path)

            response = Response(status=status.HTTP_200_OK)

        return response

