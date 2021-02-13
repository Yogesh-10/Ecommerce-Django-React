from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status

# get all products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# get single product by id
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# create a product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    product = Product.objects.create(
        user = request.user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# update a product
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    
    product.save()
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# delete a product
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

# image upload while creating a product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    
    product.image = request.FILES.get('image')
    product.save()
    
    return Response('Image uploaded')

# product reviews 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    
    product = Product.objects.get(_id=pk)
    data = request.data
    
    # 1. If Review already exists, do not allow to write review again
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # 2. No Rating or rating = 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # 3. Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        
        total = 0
        for i in reviews:
            total += i.rating
            
        product.rating = total / len(reviews)
        product.save()
        
        return Response('Review added')