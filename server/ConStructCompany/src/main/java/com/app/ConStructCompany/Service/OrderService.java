package com.app.ConStructCompany.Service;

import com.app.ConStructCompany.Request.AddOrderRequest;
import com.app.ConStructCompany.Response.PostOrderResponse;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    PostOrderResponse addOrder(AddOrderRequest addOrderRequest);
}
