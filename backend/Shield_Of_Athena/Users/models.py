from django.db import models
from django.contrib.auth.models import User

class Donation(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="donations"
    )

    def __str__(self):
        return f"{self.user.username} donated {self.amount}"