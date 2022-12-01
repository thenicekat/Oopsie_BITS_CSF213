package com.oopsie.shoppingapp.Order;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.vladmihalcea.hibernate.type.json.JsonStringType;

class OrderedProducts {
   private Long productId;
   private Long quantity;
   private Long priceAtPurchase;
   
   public Long getPriceAtPurchase() {
      return priceAtPurchase;
   }
   
   public void setPriceAtPurchase(Long priceAtPurchase) {
      this.priceAtPurchase = priceAtPurchase;
   }
   
   public Long getProductId() {
      return productId;
   }
   
   public void setProductId(Long productId) {
      this.productId = productId;
   }
   
   public Long getQuantity() {
      return quantity;
   }
   
   public void setQuantity(Long quantity) {
      this.quantity = quantity;
   }
}

class Items {
   //Array of ordered Products
   private OrderedProducts[] orderedProducts;

   public OrderedProducts[] getOrderedProducts() {
      return orderedProducts;
   }

   public void setOrderedProducts(OrderedProducts[] orderedProducts) {
      this.orderedProducts = orderedProducts;
   }
}


@Entity
@Table(name = "orders")
@TypeDef(
    name = "json",
    typeClass = JsonStringType.class
)
public class OrderModel {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "orderId")
   private Long orderId;

   @Type(type = "json")
   @Column(name = "items", columnDefinition = "json")
   private Items items;

   @Column(name = "cost")
   private Long cost;

   @Column(name = "buyerId")
   private Long buyerId;

   @Column(name = "err")
   private String err;

   public String getErr() {
      return err;
   }

   public void setErr(String err) {
      this.err = err;
   }

   public Long getOrderId() {
      return orderId;
   }

   public void setOrderId(Long orderId) {
      this.orderId = orderId;
   }

   public Items getItems() {
      return items;
   }

   public void setItems(Items items) {
      this.items = items;
   }

   public Long getCost() {
      return cost;
   }

   public void setCost(Long cost) {
      this.cost = cost;
   }

   public Long getBuyerId() {
      return buyerId;
   }

   public void setBuyerId(Long buyerId) {
      this.buyerId = buyerId;
   }
}
