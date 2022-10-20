package com.oopsie.shoppingapp.ProductsRepository;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsService {
    @Autowired
    ProductsRepository prRepository;

    // CREATE
    public ProductsModel createProduct(ProductsModel product) {
        return prRepository.save(product);
    }

    // READ
    public List<ProductsModel> getProducts() {
        return prRepository.findAll();
    }

    public ProductsModel getProduct(String productId) {
        ProductsModel product = prRepository.findByProductId(productId).get();
        return product;
    }

    // UPDATE
    public ProductsModel updateProduct(String productId, UserModel productDetails) {
        try{
            ProductsModel product = prRepository.findByProductId(productId).get();
            product.setPrice(productDetails.getPrice());
            product.setQty(productDetails.getQty());
            product.setId(productDetails.getId());
    
            return prRepository.save(product);
        }
        catch(NoSuchElementException e){
            return null;
        }
    }

    // DELETE
    public void deleteProduct(String productId) {
        prRepository.deleteById(productId);
    }
}

