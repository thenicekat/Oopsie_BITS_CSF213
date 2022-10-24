package com.oopsie.shoppingapp.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductsController {
    @Autowired
    ProductsService ProductsService;

    @PostMapping("/add")
    public ProductsModel createProducts(@RequestBody ProductsModel Products){
        return ProductsService.ProductsProducts(Products);
    }
    @PostMapping("/update")
    public ProductsModel updateProducts(@RequestBody ProductsModel Products){
        return ProductsService.updateProducts(Products.getProudct_id(), Products);
    }

    @GetMapping("/delete")
    public Boolean deleteProducts(@RequestParam long Products_id){
        try{
            ProductsService.deleteProducts(ProductsId);
    ProductsService productsService;

    @PostMapping("/add")
    public ProductsModel createProduct(@RequestBody ProductsModel product){
        return productsService.createProduct(product);
    }

    @PostMapping("/update")
    public ProductsModel updateProduct(@RequestBody ProductsModel product){
        return productsService.updateProduct(product.getProductId(), product);
    }

    @DeleteMapping("/delete")
    public Boolean deleteProduct(@RequestParam Long productId){
        try{
            productsService.deleteProduct(productId);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
    }
}
