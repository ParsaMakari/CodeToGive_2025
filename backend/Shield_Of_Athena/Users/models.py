from django.db import models
from django.contrib.auth.models import User

class Donations(models.Model):
    amount = models.FloatField(verbose_name="amount donated")
    date = models.DateField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="donations"
    )

    def __str__(self):
        return f"{self.user.username} donated {self.amount}"