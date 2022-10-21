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
   private int cost;

   @Column(name = "buyerId")
   private long buyerId;

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

   public int getCost() {
      return cost;
   }

   public void setCost(int cost) {
      this.cost = cost;
   }

   public long getBuyerId() {
      return buyerId;
   }

   public void setBuyerId(long buyerId) {
      this.buyerId = buyerId;
   }
}
