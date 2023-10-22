from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from base.models import Product



@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
      query = ""

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products,  many=True)
    return Response(serializer.data)
   
   

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

