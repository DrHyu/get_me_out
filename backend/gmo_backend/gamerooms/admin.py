# Base Imports
from __future__ import unicode_literals

# Third Party Libraries
from django.contrib import admin

# Project Imports
from gamerooms import models as gamerooms_models


# Register your models here.
admin.site.register(gamerooms_models.GameRoom)