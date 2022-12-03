package com.oopsie.shoppingapp.Order;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopsie.shoppingapp.User.UserModel;
import com.oopsie.shoppingapp.User.UserRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    // CREATE
    public OrderModel createOrder(OrderModel order) {
        try{
            UserModel whoOrdered = userRepository.findById(order.getBuyerId()).get();
            System.out.println(order.getCost() + " " + whoOrdered.getMoney());
            if(order.getCost() <= whoOrdered.getMoney()){
                whoOrdered.setMoney(whoOrdered.getMoney() - order.getCost());
                order.setStatus(false);
                return orderRepository.save(order);
            }else{
                OrderModel orderModel = new OrderModel();
                orderModel.setErr("Couldn't place order due to lack of money");
                return orderModel;
            }
        }catch(NoSuchElementException e){
            OrderModel orderModel = new OrderModel();
            orderModel.setErr("No such User exists");
            return orderModel;
        }
    }

    // READ
    public List<OrderModel> getOrders() {
        return orderRepository.findAll();
    }

    public List<OrderModel> getOrdersByUser(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId).get();
    }

    public OrderModel getOrder(Long orderId) {
        OrderModel order = orderRepository.findByOrderId(orderId).get();
        return order;
    }

    // UPDATE
    public OrderModel updateOrder(Long orderId, OrderModel orderDetails) {
        try{
            OrderModel order = orderRepository.findByOrderId(orderId).get();
            order.setOrderId(orderDetails.getOrderId());
            order.setStatus(orderDetails.getStatus());
            return orderRepository.save(order);
        }catch(NoSuchElementException e){
            OrderModel orderModel = new OrderModel();
            orderModel.setErr("No such Order exists");
            return orderModel;
        }
    }

    // DELETE
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
