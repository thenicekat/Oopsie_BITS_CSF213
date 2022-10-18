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
   @Column(name = "order_id")
   private Long order_id;

   @Column(name = "items")
   // Array of item id's. Example [101, 121, 221, 101]
   private int[] items;

   @Column(name = "cost")
   private int cost;

   // @Column(name = "rating")
   // // out of 5 stars rating
   // private int rating;

}
