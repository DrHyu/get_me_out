from django.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.gis.geos import Point
#from django.contrib.auth.models import User

#Autofield


class Country (models.Model):
    """Describes a Country."""
    country_id = models.IntegerField(primary_key=True, help_text="Identifier of the Country (Integer).")
    country_name = models.CharField(max_length=128, blank=False, null=False, help_text="Name of the Country.")


class State (models.Model):
    """Describes a State."""
    state_id = models.IntegerField(primary_key=True, help_text="Identifier of the State (Integer).")
    state_name = models.CharField(max_length=128, blank=False, null=False, help_text="Name of the State.")
    state_country = models.ForeignKey(Country, on_delete=models.PROTECT)


class City (models.Model):
    """Describes a City."""
    city_id = models.IntegerField(primary_key=True, help_text="Identifier of the City (Integer).")
    city_name = models.CharField(max_length=128, blank=False, null=False, help_text="Name of the City.")
    city_country = models.ForeignKey(Country, on_delete=models.PROTECT)
    city_state = models.ForeignKey(State, on_delete=models.PROTECT)
    city_latlong = PointField(srid=4326, geography=True, help_text="Latitude and Longitude of the City.",
                              default=Point(43.263630, -2.928082))


class Company (models.Model):
    """Describes a Company."""
    company_id = models.IntegerField(primary_key=True, help_text="Identifier of the Company (Integer).")
    company_name = models.CharField(max_length=128, blank=False, null=False, help_text="Name of the Company.")
    company_description = models.CharField(max_length=256, blank=True, default="",
                                           help_text="Description of the Company.")
    company_telephone = models.CharField(max_length=17, blank=True) #REVISE


class GameCenter (models.Model):
    """Describes a GameCenter."""
    center_id = models.IntegerField(primary_key=True, help_text="Identifier of the GameCenter (Integer).")
    center_company = models.ForeignKey(Company, on_delete=models.PROTECT)
    center_description = models.CharField(max_length=256, blank=False, null=False, default="",
                                          help_text="Description of the GameCenter.")
    center_city = models.ForeignKey(City, on_delete=models.PROTECT, null=True)
    center_latlong = PointField(srid=4326, geography=True, help_text="Latitude and Longitude of the GameCenter (Float).",
                                default=Point(43.263630, -2.928082))


class Category (models.Model):
    category_id = models.PositiveIntegerField(primary_key=True, help_text="Identifier of the Category (Integer).")
    category_name = models.CharField(max_length=128, blank=False, null=False, default="",
                                     help_text="Name of the Category.")


class DifficultyLevel (models.Model):
    difficulty_id = models.IntegerField(primary_key=True, help_text="Identifier of the Difficulty Level (Integer).")
    difficulty_name = models.CharField(max_length=128, blank=False, null=False, help_text="Name of the Difficulty.")


class GameRoom (models.Model):
    """Describes a GameRoom."""
    room_id = models.IntegerField(primary_key=True, help_text="Identifier of the GameRoom (Integer).")
    room_name = models.CharField(max_length=128, blank=False, null=False, default="",
                                 help_text="Name of the GameRoom.")
    room_description = models.CharField(max_length=256, blank=False, null=False, default="",
                                   help_text="Description of the GameRoom.")
    room_img = models.URLField(max_length=200)
    room_rating = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).", default=5)
    #room_open = models.BooleanField(default=True, help_text="Rating of the GameRoom (Integer).")
    room_game_center = models.ForeignKey(GameCenter, on_delete=models.PROTECT)
    room_min_players = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).", default=1)
    room_max_players = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).", default=6)
    room_related_categories = models.ManyToManyField(Category, through='GameRoomCategory')
    room_difficulty_level = models.ForeignKey(DifficultyLevel, on_delete=models.PROTECT)
    room_price = models.FloatField(default=100, help_text="Price of the GameRoom.")
    game_room_url = models.URLField(max_length=200, default="")
    #dificulty = models.
    #completions = models.ManyToManyField(User, through='Completion')

    def __str__(self):
        """Returns the model as a string."""
        return str(self.room_id) + ' | ' + self.room_name


class GameRoomCategory (models.Model):
    gameroom = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


#class Completion (models.Model):
#    gameroom = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
#    user = models.ForeignKey(User, on_delete=models.CASCADE)
#    review_text = models.CharField(max_length=256, blank=True, null=False, default="", help_text="Text of the review.")
#    general_score = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer) made by the user.")


