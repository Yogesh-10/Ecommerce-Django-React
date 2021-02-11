from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product

# Serializers allow complex data such as querysets and model instances to be converted to 
# native Python datatypes that can then be easily rendered into JSON, XML or other content types. 
# Serializers also provide deserialization, allowing parsed data to be converted back into complex 
# types, after first validating the incoming data.

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields =  ['id','_id', 'username', 'email', 'name', 'isAdmin']
        
    def get__id(self, obj):
        return obj.id
    
    def get_name(self, obj):
        name  = obj.first_name
        if name == '':
            name = obj.email
            
        return name
    
    def get_isAdmin(self, obj):
        return obj.is_staff #these fields(is_staff) comes from default django auth fields , we are customizing it to isAdmin
        

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields =  ['id','_id', 'username', 'email', 'name', 'isAdmin', 'token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields =  '__all__'