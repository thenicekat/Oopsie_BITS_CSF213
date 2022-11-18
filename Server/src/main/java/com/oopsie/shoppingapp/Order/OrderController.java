package com.oopsie.shoppingapp.Order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/place")
    public OrderModel createOrder(@RequestBody OrderModel order){
        return orderService.createOrder(order);
    }

    @PostMapping("/update")
    public OrderModel updateOrder(@RequestBody OrderModel order){
        return orderService.updateOrder(order.getOrderId(), order);
    }

    @GetMapping("/list")
    public List<OrderModel> listOrders(){
        return orderService.getOrders();
    }

    @GetMapping("/listbyuser")
    public List<OrderModel> listOrdersByUser(@RequestParam long userId){
        return orderService.getOrdersByUser(userId);
    }

    @DeleteMapping("/delete")
    public Boolean deleteOrder(@RequestParam long orderId){
        try{
            orderService.deleteOrder(orderId);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @PostMapping("/get")
    public OrderModel getExistingOrder(@RequestBody OrderModel order){
        return orderService.getOrder(order.getOrderId());
    }
}
