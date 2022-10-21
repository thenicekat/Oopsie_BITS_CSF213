package com.oopsie.shoppingapp.Order;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
    Optional<OrderModel> findByOrderId(Long order_id);
    Optional<OrderModel> deleteByOrderId(Long order_id);
    // {
    //     int isSuccessful = entityManager.createQuery("delete from Order o where o.order_id=:order_id")
    //     .setParameter("order_id", order_id)
    //     .executeUpdate();

    //     if (isSuccessful == 0) {
    //         throw new OptimisticLockException(" product modified concurrently");
    //     }
    // };
}
