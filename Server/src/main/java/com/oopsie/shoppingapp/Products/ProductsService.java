package com.oopsie.shoppingapp.Products;

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

    public ProductsModel getProduct(Long productId) {
        ProductsModel product = prRepository.findByProductId(productId).get();
        return product;
    }

    // UPDATE
    public ProductsModel updateProduct(Long productId, ProductsModel productDetails) {
        try{
            ProductsModel product = prRepository.findByProductId(productId).get();
            product.setPrice(productDetails.getPrice());
            product.setQuantity(productDetails.getQuantity());
            product.setProductId(productDetails.getProductId());
    
            return prRepository.save(product);
        }
        catch(NoSuchElementException e){
            return null;
        }
    }

    // DELETE
    public void deleteProduct(Long productId) {
        prRepository.deleteByProductId(productId);
    }
}

