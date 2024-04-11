package com.app.ConStructCompany.Service;

import com.app.ConStructCompany.Request.AddOrderRequest;
import com.app.ConStructCompany.Request.GetOrdersRequest;
import com.app.ConStructCompany.Response.PostOrderResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    PostOrderResponse addOrder(AddOrderRequest addOrderRequest);
    ResponseEntity getOrders(GetOrdersRequest getOrdersRequest);
}
