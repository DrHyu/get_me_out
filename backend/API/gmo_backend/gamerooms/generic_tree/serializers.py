# Base Imports

# Third Party Libraries
from rest_framework import serializers

# Project Imports


class MergeTreeAPIViewSerializer(serializers.Serializer):
    """The serializer for the merge tree functionality."""
    id_merge_to = serializers.IntegerField(help_text="Id to merge to.")
    id_merge_from = serializers.IntegerField(help_text="Id to merge from. The element will be destroyed after the merge.")

    class Meta:
        model = None