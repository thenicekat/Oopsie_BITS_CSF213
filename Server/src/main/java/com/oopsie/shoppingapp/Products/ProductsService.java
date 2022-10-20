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
    public ProductsModel createPr(ProductsModel pr) {
        return prRepository.save(pr);
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
    public ProductsModel updatePr(String pId, UserModel pDetails) {
        try{
            ProductsModel pr = prRepository.findByProductId(productId).get();
            pr.setPrice(pDetails.getPrice());
            pr.setQty(pDetails.getQty());
            pr.setId(pDetails.getId());
    
            return prRepository.save(pr);
        }
        catch(NoSuchElementException e){
            return null;
        }
    }

    // DELETE
    public void deleteProduct(String prId) {
        prRepository.deleteById(prId);
    }
}

