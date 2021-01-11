from django.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.gis.geos import Point
#from django.contrib.auth.models import User
from users.models import User
# Create your models here.

class Location (models.Model):
    """Describes a Location."""
    location_name = models.CharField(max_length=128, blank=False, null=False, default="",
                                     help_text="Name of the Company.")

    location_parent = models.ForeignKey("self", help_text="Direct parent of the category.", on_delete=models.PROTECT,
                                        blank=True, null=True)

    #latitude = models.FloatField(help_text="Latitude of the Location (Float).", default=43.263630)
    #longitude = models.FloatField(help_text="Longitude of the Location (Float).", default=-2.928082)

    location_latlong = PointField(srid=3857, geography=True, help_text="Latitude and LOngitude of the Location (Float).",
                                  default=Point(43.263630, -2.928082))


class Company (models.Model):
    """Describes a Company."""
    company_id = models.PositiveIntegerField(primary_key=True,
                                             help_text="Identifier of the Company (Integer).")
    company_name = models.CharField(max_length=128, blank=False, null=False, default="",
                            help_text="Name of the Company.")
    company_description = models.CharField(max_length=256, blank=True, default="",
                                   help_text="Description of the Company.")
    company_telephone = models.CharField(max_length=17, blank=True)


class GameCenter (models.Model):
    """Describes a GameCenter."""
    center_id = models.PositiveIntegerField(primary_key=True,
                                            help_text="Identifier of the GameRoom (Integer).")
    center_company = models.ForeignKey(Company, on_delete=models.CASCADE)
    center_description = models.CharField(max_length=256, blank=False, null=False, default="",
                                   help_text="Description of the GameCenter.")
    center_location = models.CharField(max_length=256, blank=False, null=False, default="",
                                       help_text="Location of the GameCenter.")
    center_latlong = PointField(srid=3857, geography=True, help_text="Latitude and Longitude of the Location (Float).",
                                default=Point(43.263630, -2.928082))


class Category (models.Model):
    category_id = models.PositiveIntegerField(primary_key=True, help_text="Identifier of the Category (Integer).")
    category_name = models.CharField(max_length=128, blank=False, null=False, default="",
                                     help_text="Name of the Category.")

class GameRoom (models.Model):
    """Describes a GameRoom."""
    room_id = models.PositiveIntegerField(primary_key=True,
                                          help_text="Identifier of the GameRoom (Integer).")
    room_name = models.CharField(max_length=128, blank=False, null=False, default="",
                            help_text="Name of the GameRoom.")
    room_description = models.CharField(max_length=256, blank=False, null=False, default="",
                                   help_text="Description of the GameRoom.")
    room_img = models.URLField(max_length=200)
    room_rating = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).", default=5)
    room_open = models.BooleanField(default=True, help_text="Rating of the GameRoom (Integer).")
    room_game_center = models.ForeignKey(GameCenter, on_delete=models.CASCADE)
    room_min_players = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).", default=1)
    room_max_players = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).", default=6)
    related_categories = models.ManyToManyField(Category, through='GameRoomCategory')
    #completions = models.ManyToManyField(User, through='Completion')

    def __str__(self):
        """Returns the model as a string."""
        return str(self.room_id) + ' | ' + self.room_name


#class Completion (models.Model):
#    gameroom = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
#    user = models.ForeignKey(User, on_delete=models.CASCADE)
#    review_text = models.CharField(max_length=256, blank=True, null=False, default="", help_text="Text of the review.")
#    general_score = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer) made by the user.")


class GameRoomCategory (models.Model):
    gameroom = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
