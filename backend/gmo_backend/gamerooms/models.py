from django.db import models

# Create your models here.
class GameRoom (models.Model):
    """Describes a GameRoom."""
    id = models.PositiveIntegerField(primary_key=True,
                                     help_text="Identifier of the GameRoom (Integer).")
    name = models.CharField(max_length=128, blank=False, null=False, default="",
                            help_text="Name of the GameRoom.")
    description = models.CharField(max_length=256, blank=False, null=False, default="",
                                   help_text="Description of the GameRoom.")
    img = models.URLField(max_length=200)
    rating = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer).")
    open = models.BooleanField(default=True, help_text="Rating of the GameRoom (Integer).")

    def __str__(self):
        """Returns the model as a string."""
        return str(self.id) + ' | ' + self.name