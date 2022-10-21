package com.oopsie.shoppingapp.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    ProductsService productsService;

    @PostMapping("/add")
    public ProductsModel createProduct(@RequestBody ProductsModel product){
        return productsService.createProduct(product);
    }
    @PostMapping("/update")
    public ProductsModel updateProduct(@RequestBody ProductsModel product){
        return productsService.updateProduct(product.getProductId(), product);
    }

    @GetMapping("/delete")
    public Boolean deleteProduct(@RequestParam String products_id){
        try{
            productsService.deleteProduct(products_id);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
}