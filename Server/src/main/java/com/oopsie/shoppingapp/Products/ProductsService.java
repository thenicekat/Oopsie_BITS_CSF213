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
        ProductsModel pr = prRepository.findByProductId(productId).get();
        return pr;
    }

    // UPDATE
    public ProductsModel updateProduct(String productId, UserModel productDetails) {
        try{
            ProductsModel pr = prRepository.findByProductId(productId).get();
            pr.setPrice(productDetails.getPrice());
            pr.setQty(productDetails.getQty());
            pr.setId(productDetails.getId());
    
            return prRepository.save(pr);
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

