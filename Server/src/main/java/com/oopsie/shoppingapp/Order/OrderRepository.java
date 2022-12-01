package com.oopsie.shoppingapp.Order;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
    Optional<OrderModel> findByOrderId(Long orderId);
    Optional<OrderModel> deleteByOrderId(Long orderId);
    Optional<List<OrderModel>> findByBuyerId(Long buyerId);
}
