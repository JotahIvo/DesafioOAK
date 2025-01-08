from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from products.models import Products
from products.serializers import ProductsSerializer


@method_decorator(csrf_exempt, name='dispatch')
class ProductsCreateListView(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer


@method_decorator(csrf_exempt, name='dispatch')
class ProductsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
