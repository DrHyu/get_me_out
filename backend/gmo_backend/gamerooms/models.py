from django.db import models

#from django.contrib.auth.models import User
from users.models import User
# Create your models here.


class Company (models.Model):
    """Describes a Company."""
    company_id = models.PositiveIntegerField(primary_key=True,
                                             help_text="Identifier of the Company (Integer).")
    name = models.CharField(max_length=128, blank=False, null=False, default="",
                            help_text="Name of the Company.")
    description = models.CharField(max_length=256, blank=True, default="",
                                   help_text="Description of the Company.")
    telephone = models.CharField(max_length=17, blank=True)


class GameCenter (models.Model):
    """Describes a GameCenter."""
    center_id = models.PositiveIntegerField(primary_key=True,
                                            help_text="Identifier of the GameRoom (Integer).")
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.CharField(max_length=256, blank=False, null=False, default="",
                                   help_text="Description of the GameCenter.")
    location = models.CharField(max_length=256, blank=False, null=False, default="",
                                help_text="Location of the GameCenter.")


class GameRoom (models.Model):
    """Describes a GameRoom."""
    game_room_id = models.PositiveIntegerField(primary_key=True,
                                     help_text="Identifier of the GameRoom (Integer).")
    name = models.CharField(max_length=128, blank=False, null=False, default="",
                            help_text="Name of the GameRoom.")
    description = models.CharField(max_length=256, blank=False, null=False, default="",
                                   help_text="Description of the GameRoom.")
    img = models.URLField(max_length=200)
    rating = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).")
    open = models.BooleanField(default=True, help_text="Rating of the GameRoom (Integer).")
    game_center = models.ForeignKey(GameCenter, on_delete=models.CASCADE)
    completions = models.ManyToManyField(User, through='Completion')

    def __str__(self):
        """Returns the model as a string."""
        return str(self.id) + ' | ' + self.name


class Completion (models.Model):
    gameroom = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_text = models.CharField(max_length=256, blank=True, null=False, default="", help_text="Text of the review.")
    general_score = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer) made by the user.")
