package com.oopsie.shoppingapp.Order;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    // CREATE
    public OrderModel createOrder(OrderModel order) {
        return orderRepository.save(order);
    }

    // READ
    public List<OrderModel> getOrders() {
        return orderRepository.findAll();
    }

    public OrderModel getOrder(String orderId) {
        OrderModel order = orderRepository.findByOrderId(orderId).get();
        return order;
    }

    // UPDATE
    public OrderModel updateOrder(Long order_id, OrderModel orderDetails) {
        try{
            OrderModel order = orderRepository.findByOrderId(order_id).get();
            order.setFirstName(orderDetails.getFirstName());
            order.setLastName(orderDetails.getLastName());
            order.setOrderId(orderDetails.getOrderId());
    
            return orderRepository.save(order);
        }catch(NoSuchElementException e){
            return null;
        }
    }

    // DELETE
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
