# to overwrite username field with email we use signal to match username and email fields with email to login
#so if we change email field the username is also changed by email

from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email
    
pre_save.connect(updateUser,sender=User)