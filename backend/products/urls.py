from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.ProductsCreateListView.as_view(), name='products-list-view'),
    path('products/<int:pk>/', views.ProductsRetrieveUpdateDestroyView.as_view(), name='products-detail'),
]
