/*
 * The database
 */

package com.oopsie.shoppingapp.Order;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class OrderModel {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "orderId")
   private Long orderId;

   @Column(name = "items")
   // Array of item id's. Example [101, 121, 221, 101]
   private int[] items;

   @Column(name = "cost")
   private Long cost;

   @Column(name = "buyerId")
   private Long buyerId;

   public Long getOrderId() {
      return orderId;
   }

   public void setOrderId(Long orderId) {
      this.orderId = orderId;
   }

   public int[] getItems() {
      return items;
   }

   public void setItems(int[] items) {
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
