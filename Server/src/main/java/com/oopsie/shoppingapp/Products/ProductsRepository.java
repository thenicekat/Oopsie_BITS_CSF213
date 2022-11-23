package com.oopsie.shoppingapp.Products;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProductsRepository extends JpaRepository<ProductsModel, Long> {
    Optional<ProductsModel> findByProductId(Long productId);
}
