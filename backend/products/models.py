from django.db import models

class Products(models.Model):
    name        = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    price       = models.FloatField(default=0.0, blank=True, null=True)
    available   = models.IntegerField()

    def __str__(self):
        return self.name
