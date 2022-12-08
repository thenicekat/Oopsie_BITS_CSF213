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
        try {
            UserModel whoOrdered = userRepository.findById(order.getBuyerId()).get();

            if (order.getCost() <= whoOrdered.getMoney()) {
                // Check money
                whoOrdered.setMoney(whoOrdered.getMoney() - order.getCost());
                order.setStatus(false);

                // Check Stock and remove
                for (int i = 0; i < order.getItems().getOrderedProducts().length; i++) {
                    if (productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                            .getQuantity() > order.getItems().getOrderedProducts()[i].getQuantity()) {
                        // This means there is stock
                        productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                                .setQuantity(productsRepository
                                        .findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                                        .getQuantity() - 1);
                    } else {
                        OrderModel orderModel = new OrderModel();
                        orderModel.setErr("Couldn't place order due to unavailablity of products");
                        return orderModel;
                    }
                }

                // Get Delivery Date
                Long maxDays = 0L;
                for (int i = 0; i < order.getItems().getOrderedProducts().length; i++) {
                    Long currentDays = productsRepository
                            .findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                            .getNoOfDaysForDelivery();
                    if (currentDays > maxDays) {
                        maxDays = currentDays;
                    }
                }
                order.setNoOfDaysForDelivery(maxDays);
                String orderInString = "";
                for (int i = 0; i < order.getItems().getOrderedProducts().length; i++) {
                    orderInString += "<hr> <img width=200 height=100 src='"
                            + productsRepository
                                    .findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getImage()
                            + "'>" + "<br>"
                            + productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                                    .getProductName()
                            + "<br>"
                            + productsRepository
                                    .findById(order.getItems().getOrderedProducts()[i].getProductId()).get().getPrice()
                            + "<br>"
                            + productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                                    .getQuantity()
                            + "<br>"
                            + productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                                    .getDetails()
                            + "<br> <hr>";
                }
                try {
                    SendEmail.sendmail(
                            whoOrdered.getEmailId(),
                            "Your order has been successfully placed and it will be delivered within "
                            + order.getNoOfDaysForDelivery() + " Days",
                            "<!doctype html><html><head><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title>Simple Transactional Email</title><style>img{border:none;-ms-interpolation-mode:bicubic;max-width:100%}body{background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}table{border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%}table td{font-family:sans-serif;font-size:14px;vertical-align:top}.body{background-color:#f6f6f6;width:100%}.container{display:block;margin:0 auto!important;max-width:580px;padding:10px;width:580px}.content{box-sizing:border-box;display:block;margin:0 auto;max-width:580px;padding:10px}.main{background:#fff;border-radius:3px;width:100%}.wrapper{box-sizing:border-box;padding:20px}.content-block{padding-bottom:10px;padding-top:10px}.footer{clear:both;margin-top:10px;text-align:center;width:100%}.footer a,.footer p,.footer span,.footer td{color:#999;font-size:12px;text-align:center}h1,h2,h3,h4{color:#000;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;margin-bottom:30px}h1{font-size:35px;font-weight:300;text-align:center;text-transform:capitalize}ol,p,ul{font-family:sans-serif;font-size:14px;font-weight:400;margin:0;margin-bottom:15px}ol li,p li,ul li{list-style-position:inside;margin-left:5px}a{color:#3498db;text-decoration:underline}.btn{box-sizing:border-box;width:100%}.btn>tbody>tr>td{padding-bottom:15px}.btn table{width:auto}.btn table td{background-color:#fff;border-radius:5px;text-align:center}.btn a{background-color:#fff;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;color:#3498db;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;margin:0;padding:12px 25px;text-decoration:none;text-transform:capitalize}.btn-primary table td{background-color:#3498db}.btn-primary a{background-color:#3498db;border-color:#3498db;color:#fff}.last{margin-bottom:0}.first{margin-top:0}.align-center{text-align:center}.align-right{text-align:right}.align-left{text-align:left}.clear{clear:both}.mt0{margin-top:0}.mb0{margin-bottom:0}.preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}.powered-by a{text-decoration:none}hr{border:0;border-bottom:1px solid #f6f6f6;margin:20px 0}@media only screen and (max-width:620px){table.body h1{font-size:28px!important;margin-bottom:10px!important}table.body a,table.body ol,table.body p,table.body span,table.body td,table.body ul{font-size:16px!important}table.body .article,table.body .wrapper{padding:10px!important}table.body .content{padding:0!important}table.body .container{padding:0!important;width:100%!important}table.body .main{border-left-width:0!important;border-radius:0!important;border-right-width:0!important}table.body .btn table{width:100%!important}table.body .btn a{width:100%!important}table.body .img-responsive{height:auto!important;max-width:100%!important;width:auto!important}}@media all{.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}.apple-link a{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important}#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}.btn-primary table td:hover{background-color:#34495e!important}.btn-primary a:hover{background-color:#34495e!important;border-color:#34495e!important}}</style></head><body><span class=\"preheader\">This is preheader text. Some clients will show this text as a preview.</span><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\"><tr><td>&nbsp;</td><td class=\"container\"><div class=\"content\"><table role=\"presentation\" class=\"main\"><tr><td class=\"wrapper\"><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td><p>Hi "
                            + whoOrdered.getFirstName()
                            + ",</p><p>Thank you for placing an order with OOPSIE. We hope we were able to provide a you a good experience.</p>"
                            + orderInString
                            + "<br><br><p>We hope that your shopping with us was not an OOPSIE Moment ;)</p><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\"><tbody><tr><td align=\"left\"><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSf3_s6aVMiN0z46v7NZ34Igg6AbItxM3rH3jqNt3iWiH3fJjw/viewform?usp=sf_link\" target=\"_blank\">Your Review matters to us</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr></table><div class=\"footer\"><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"content-block\"><br>Don't like these emails?<a href=\"http://i.imgur.com/CScmqnj.gif\">Unsubscribe</a>.</td></tr><tr><td class=\"content-block powered-by\">Powered by Oopsie.</td></tr></table></div></div></td><td>&nbsp;</td></tr></table></body></html>");
                } catch (Exception e) {
                    e.printStackTrace();
                }

                return orderRepository.save(order);
            } else {
                OrderModel orderModel = new OrderModel();
                orderModel.setErr("Couldn't place order due to lack of money");
                return orderModel;
            }
        } catch (NoSuchElementException e) {
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
        try {
            OrderModel order = orderRepository.findByOrderId(orderId).get();
            UserModel whoOrdered = userRepository.findById(order.getBuyerId()).get();
            order.setOrderId(orderDetails.getOrderId());
            order.setStatus(orderDetails.getStatus());
            try {
                SendEmail.sendmail(whoOrdered.getEmailId(),
                        "Order status for Order No. " + orderDetails.getOrderId() + " has been updated.",
                        "You are receiving this mail from OOPSIE");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return orderRepository.save(order);
        } catch (NoSuchElementException e) {
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
        for (int i = 0; i < order.getItems().getOrderedProducts().length; i++) {
            if (productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                    .getQuantity() > order.getItems().getOrderedProducts()[i].getQuantity()) {
                // This means there is stock
                productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get().setQuantity(
                        productsRepository.findById(order.getItems().getOrderedProducts()[i].getProductId()).get()
                                .getQuantity() + 1);
            }
        }

        orderRepository.deleteById(orderId);
    }
}
