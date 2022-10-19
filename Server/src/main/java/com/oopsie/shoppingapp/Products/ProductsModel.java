package com.oopsie.shoppingapp.Products;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class ProductsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "rating")
    private double rating;

    @Column(name= "details")
    private String details;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQty() {
        return quantity;
    }

    public double getRating(){
        return rating;
    }
    public double setRating(double rating){
        this.review=review;
    }

    public String getDetails()
    {
        return details;
    }
    public String setDetails(String details)
    {
        this.details =  details;
    }

    public void setQty(int quantity) {
        this.quantity = quantity;
    }
    int a;
}


