package com.oopsie.shoppingapp.Order;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopsie.shoppingapp.SendEmail;
import com.oopsie.shoppingapp.Products.ProductsRepository;
import com.oopsie.shoppingapp.User.UserModel;
import com.oopsie.shoppingapp.User.UserRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductsRepository productsRepository;

    // CREATE
    public OrderModel createOrder(OrderModel order) {
        try{
            UserModel whoOrdered = userRepository.findById(order.getBuyerId()).get();
            
            if(order.getCost() <= whoOrdered.getMoney()){
                // Check money
                whoOrdered.setMoney(whoOrdered.getMoney() - order.getCost());
                order.setStatus(false);

                // Check Stock and remove
                for(int i = 0; i < order.getItems().getOrderedProducts().length; i++){
                    if(productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getQuantity() > order.getItems().getOrderedProducts()[i].getQuantity()){
                        // This means there is stock
                        productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().setQuantity(productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getQuantity() - 1);
                    }else{
                        OrderModel orderModel = new OrderModel();
                        orderModel.setErr("Couldn't place order due to unavailablity of products");
                        return orderModel;
                    }
                }

                // Get Delivery Date
                Long maxDays = 0L;
                for(int i = 0; i < order.getItems().getOrderedProducts().length; i++){
                    Long currentDays = productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getNoOfDaysForDelivery();
                    if(currentDays > maxDays){
                        maxDays = currentDays;
                    }
                }
                order.setNoOfDaysForDelivery(maxDays);
                try {
                    SendEmail.sendmail(whoOrdered.getEmailId(), "Your order has been successfully placed and it will be delivered within" + order.getNoOfDaysForDelivery());
                } catch (Exception e) {
                    e.printStackTrace();
                }

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
            UserModel whoOrdered = userRepository.findById(order.getBuyerId()).get();
            order.setOrderId(orderDetails.getOrderId());
            order.setStatus(orderDetails.getStatus());
            try {
                SendEmail.sendmail(whoOrdered.getEmailId(), "Order status for Order No. " + orderDetails.getOrderId() +" has been updated.");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return orderRepository.save(order);
        }catch(NoSuchElementException e){
            OrderModel orderModel = new OrderModel();
            orderModel.setErr("No such Order exists");
            return orderModel;
        }
    }

    // DELETE
    public void deleteOrder(Long orderId) {
        OrderModel order = orderRepository.findByOrderId(orderId).get();
        
        // Add Money Back into his account
        UserModel whoOrdered = userRepository.findById(order.getBuyerId()).get();
        whoOrdered.setMoney(whoOrdered.getMoney() + order.getCost());
        
        // Add Stock Back Again
        for(int i = 0; i < order.getItems().getOrderedProducts().length; i++){
            if(productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getQuantity() > order.getItems().getOrderedProducts()[i].getQuantity()){
                // This means there is stock
                productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().setQuantity(productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getQuantity() + 1);
            }
        }
        
        orderRepository.deleteById(orderId);
    }
}
