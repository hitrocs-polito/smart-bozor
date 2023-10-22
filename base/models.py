from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    image = models.CharField(max_length=2000, blank=True, null=True)
    # image = models.ImageField(blank=True, null=True)
    brand = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.name)
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=15, decimal_places=2, null=True)  
    shippingPrice = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    totalPrice = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self) -> str:
        return str(self.createdAt)
    

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    
    def __str__(self) -> str:
        return str(self.name)
    

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    region = models.CharField(max_length=200, null=True, blank=True)
    district = models.CharField(max_length=200, null=True, blank=True)
    street = models.CharField(max_length=200, null=True, blank=True)
    phoneNumber = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self) -> str:
        return str(self.street)