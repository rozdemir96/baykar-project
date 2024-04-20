from django.db import models

# Create your models here.
class Categories(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    
    class Meta:
        db_table = 'categories'