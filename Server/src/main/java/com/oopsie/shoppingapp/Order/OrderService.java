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
                    SendEmail.sendmail(
                        whoOrdered.getEmailId(),
                        "Your order has been successfully placed and it will be delivered within " + order.getNoOfDaysForDelivery() + " Days",
                        "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\"><head><link href=\"https://fonts.googleapis.com/css2?family=Krona+One&display=swap\" rel=\"stylesheet\"><link href=\"https://fonts.googleapis.com/css2?family=Poppins&display=swap\" rel=\"stylesheet\"><!--<![endif]--></head><body data-new-gr-c-s-loaded=\"14.1088.0\"><div class=\"es-wrapper-color\"><table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td class=\"esd-email-paddings\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"esd-header-popover es-header\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" align=\"center\"><table bgcolor=\"#ffffff\" class=\"es-header-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\"><tbody><tr><td class=\"esd-structure es-p20\" align=\"left\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-left\" align=\"left\"><tbody><tr><td width=\"98\" class=\"es-m-p0r es-m-p20b esd-container-frame\" valign=\"top\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]><td width=\"20\"></td><td width=\"442\" valign=\"top\"><![endif]--><table cellpadding=\"0\" cellspacing=\"0\" align=\"right\"><tbody><tr><td width=\"442\" align=\"left\" class=\"esd-container-frame\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]><![endif]--></td></tr></tbody></table></td></tr></tbody></table><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" align=\"center\" style=\"background:#2e0249;background:linear-gradient(0deg,rgba(46,2,73,1) 11%,rgba(87,10,87,1) 90%)\"><table class=\"es-content-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"background-color:transparent\"><tbody><tr><td class=\"esd-structure es-p30t es-p30b es-p20r es-p20l\" align=\"left\" style=\"border-radius:20px;background-image:url(https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_3_pXL.png);background-repeat:no-repeat;background-position:center center\" background=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_3_pXL.png\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td width=\"560\" class=\"esd-container-frame\" align=\"center\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-block-text\"><h1><br>FEEDBACK TIME</h1></td></tr><tr><td align=\"center\" class=\"esd-block-image\" style=\"font-size:0\"><a target=\"_blank\" href=\"https://viewstripo.email\"><img class=\"adapt-img\" src=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/socialmediainstagramdigitalmarketingconcept3drenderingremovebgpreview_1.png\" alt style=\"display:block\" width=\"560\"></a></td></tr><tr><td align=\"center\" class=\"esd-block-text\"><h2>THANK YOU!</h2></td></tr><tr><td align=\"left\" class=\"esd-block-text es-p10t es-p20b es-p40r es-p40l\"><p>Dear " + whoOrdered.getFirstName() + ",<br><br>We are glad that you have purchased your desired products via our website. We would like to know your experience while navigating through our website. Please take out not more than a minute to fill out the form given below.&nbsp;<br></p><p><br>Sincerely,<br></p><p>Team OOPSIE</p></td></tr><tr><td align=\"center\" class=\"esd-block-button\"><span class=\"es-button-border\"><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSf3_s6aVMiN0z46v7NZ34Igg6AbItxM3rH3jqNt3iWiH3fJjw/viewform?usp=sf_link\" class=\"es-button\" target=\"_blank\">Rate Now!</a></span></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td class=\"esd-structure es-p20t es-p20b\" align=\"left\"><!--[if mso]><table width=\"600\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"207\" valign=\"top\"><![endif]--><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-left\" align=\"left\"><tbody><tr><td width=\"187\" class=\"es-m-p0r es-m-p20b esd-container-frame\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" background=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_5_OHl.png\" style=\"background-image:url(https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_5_OHl.png);background-repeat:no-repeat;background-position:center center;border-radius:15px;border-collapse:separate\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td><td class=\"es-hidden\" width=\"20\"></td></tr></tbody></table><!--[if mso]><td width=\"187\" valign=\"top\"><![endif]--><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-left\" align=\"left\"><tbody><tr><td width=\"187\" class=\"es-m-p0r es-m-p20b esd-container-frame\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" background=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_2_4B9.png\" style=\"background-image:url(https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_2_4B9.png);background-repeat:no-repeat;background-position:center center;border-radius:15px;border-collapse:separate\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]><td width=\"20\"></td><td width=\"186\" valign=\"top\"><![endif]--><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-right\" align=\"right\"><tbody><tr><td width=\"186\" class=\"es-m-p0r esd-container-frame\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" background=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_YZD.png\" style=\"background-image:url(https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_YZD.png);background-repeat:no-repeat;background-position:center center;border-radius:15px;border-collapse:separate\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]><![endif]--></td></tr><tr><td class=\"esd-structure es-p30t es-p30b es-p20r es-p20l\" align=\"left\" style=\"border-radius:20px;background-image:url(https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_3_pXL.png);background-repeat:no-repeat;background-position:center center\" background=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/meshgradient_3_pXL.png\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td width=\"560\" class=\"esd-container-frame\" align=\"center\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-block-text es-p10b\"><h1>Thank you!</h1></td></tr><tr><td align=\"center\" class=\"esd-block-image\" style=\"font-size:0\"><a target=\"_blank\" href=\"https://viewstripo.email\"><img class=\"adapt-img\" src=\"https://zlxecq.stripocdn.email/content/guids/CABINET_6238642ba45954e6d6ce5fb7661d4679/images/5293039.png\" alt style=\"display:block\" width=\"200\"></a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td class=\"esd-structure es-p20t es-p20r es-p20l\" align=\"left\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td width=\"560\" class=\"esd-container-frame\" align=\"center\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-block-spacer\" height=\"0\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" align=\"center\"><table bgcolor=\"#ffffff\" class=\"es-content-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"border-radius:10px;border-collapse:separate\"><tbody><tr><td class=\"esd-structure es-p40t es-p20r es-p20l\" align=\"left\" style=\"border-left:2px solid #f6c6ea;border-right:2px solid #f6c6ea;border-top:2px solid #f6c6ea;border-radius:20px 20px 0 0\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td width=\"556\" class=\"esd-container-frame\" align=\"center\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td class=\"esd-structure es-p20 esdev-adapt-off\" align=\"left\" style=\"border-left:2px solid #f6c6ea;border-right:2px solid #f6c6ea;border-bottom:2px solid #f6c6ea;border-radius:0 0 20px 20px\"><table width=\"560\" cellpadding=\"0\" cellspacing=\"0\" class=\"esdev-mso-table\"><tbody><tr><td class=\"esdev-mso-td\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-left\" align=\"left\"><tbody><tr><td width=\"268\" class=\"esd-container-frame\" align=\"left\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table></td><td width=\"20\"></td><td class=\"esdev-mso-td\" valign=\"top\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-right\" align=\"right\"><tbody><tr><td width=\"268\" align=\"left\" class=\"esd-container-frame\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer esd-footer-popover\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" align=\"center\" esd-custom-block-id=\"697481\"><table class=\"es-footer-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"rgba(0, 0, 0, 0)\" style=\"border-radius:0 0 10px 10px\"><tbody><tr><td class=\"esd-structure es-p30t es-p30b es-p20r es-p20l\" align=\"left\" esd-custom-block-id=\"697480\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td width=\"560\" class=\"esd-container-frame\" align=\"left\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td class=\"esd-structure es-p20\" align=\"left\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td width=\"560\" class=\"esd-container-frame\" align=\"left\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody><tr><td align=\"center\" class=\"esd-empty-container\" style=\"display:none\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>"
                    );
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
                SendEmail.sendmail(whoOrdered.getEmailId(), "Order status for Order No. " + orderDetails.getOrderId() +" has been updated.", "You are receiving this mail from OOPSIE");
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
