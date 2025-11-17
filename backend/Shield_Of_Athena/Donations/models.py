from django.db import models
from django.contrib.auth.models import User


def get_anonymous_user():
    return User.objects.get_or_create(username="Anonymous")[0]

class Donation(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=5)
    is_recurring = models.BooleanField(default=False)
    date = models.DateField()
    user = models.ForeignKey(
        User,
        on_delete=models.SET(get_anonymous_user),
        related_name="donations",
        null=True,
        blank=True,
        default=get_anonymous_user,
    )
    impact_pathway_slug = models.CharField(max_length= 200, null=True)
    message = models.TextField(null= True)


    def __str__(self):
        return f"Donation: {self.amount} by {self.user.username}"