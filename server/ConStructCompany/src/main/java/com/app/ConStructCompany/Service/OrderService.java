package com.app.ConStructCompany.Service;

import com.app.ConStructCompany.Request.AddOrderRequest;
import com.app.ConStructCompany.Request.EditOrderRequest;
import com.app.ConStructCompany.Request.GetOrdersRequest;
import com.app.ConStructCompany.Request.SetIsPaymentedRequest;
import com.app.ConStructCompany.Response.PostOrderResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    PostOrderResponse addOrder(AddOrderRequest addOrderRequest);
    PostOrderResponse editOrder(EditOrderRequest editOrderRequest);
    ResponseEntity getOrders(GetOrdersRequest getOrdersRequest);
    PostOrderResponse deleteOrder(Long id);
    PostOrderResponse setIsPaymented(SetIsPaymentedRequest setIsPaymentedRequest);
}
