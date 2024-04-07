package com.app.ConStructCompany.Controller;

import com.app.ConStructCompany.Request.AddOrderRequest;
import com.app.ConStructCompany.Response.PostOrderResponse;
import com.app.ConStructCompany.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order/")
@AllArgsConstructor
public class OrderController {
    public final OrderService orderService;
    @PostMapping("/add-order")
    public PostOrderResponse addOrder(@RequestBody AddOrderRequest addOrderRequest){
        return orderService.addOrder(addOrderRequest);
    }
}
