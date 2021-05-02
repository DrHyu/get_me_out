from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager
from gamerooms.models import GameRoom


class User(AbstractUser):
    pass

    def __str__(self):
        return self.email


class Review(models.Model):
    gameroom = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_text = models.CharField(max_length=256, blank=True, null=False, default="", help_text="Text of the review.")
    general_score = models.PositiveIntegerField(help_text="Rating of the GameRoom (Integer) made by the user.")


class LikedReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)


class BookmarkedEscapeRoom(models.Model):
    bookmark_index = models.PositiveIntegerField(help_text="Index of the bookmark.")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    escape_room = models.ForeignKey(GameRoom, on_delete=models.CASCADE)


class UserStats(models.Model):
    """ Model to represent User Stats """
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    num_completed_escaperooms = models.PositiveIntegerField(help_text="Amount of escape rooms completed.", default=0)
    num_friends = models.PositiveIntegerField(help_text="Amount of friends.", default=0)
    num_reviews = models.PositiveIntegerField(help_text="Amount of reviews made.", default=0)


class Friendship(models.Model):
    """ Model to represent Friendships """
    to_user = models.ForeignKey(User, models.CASCADE, related_name='friendship')
    from_user = models.ForeignKey(User, models.CASCADE, related_name='_back_friendship_relation')


class FriendRequest(models.Model):
    """ Model to represent Friend Requests """
    to_user = models.ForeignKey(User, models.CASCADE, related_name='friendship_request')
    from_user = models.ForeignKey(User, models.CASCADE, related_name='_back_friendship_request_relation')
