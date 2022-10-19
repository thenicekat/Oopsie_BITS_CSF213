package com.oopsie.shoppingapp.Products;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsService {
    @Autowired
    ProductsRepository ProductsRepository;

    // CREATE
    public ProductsModel createProducts(ProductsModel Products) {
        return ProductsRepository.save(Products);
    }

    // READ
    public List<ProductsModel> getProductss() {
        return ProductsRepository.findAll();
    }

    public ProductsModel getProducts(String ProductsId) {
        ProductsModel Products = ProductsRepository.findByProduct_id(ProductsId).get();
        return Products;
    }

    // UPDATE
    public ProductsModel updateProducts(Long Products_id, ProductsModel ProductsDetails) {
        try{
            ProductsModel Products = ProductsRepository.findBProducts_Id(Products_id).get();
            //Products.setFirstName(ProductsDetails.getFirstName());
            //Products.setLastName(ProductsDetails.getLastName());
           // Products.setEmailId(ProductsDetails.getEmailId());
    
            return ProductsRepository.save(Products);
        }catch(NoSuchElementException e){
            return null;
        }
    }

    // DELETE
    public void deleteProducts(Long ProductsId) {
        ProductsRepository.deleteByProduct_Id(ProductsId);
    }
}
