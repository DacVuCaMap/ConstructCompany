package com.app.ConStructCompany.Request;

import com.app.ConStructCompany.Request.dto.OrderDetailDto;
import com.app.ConStructCompany.Request.dto.OrderDto;
import lombok.Data;

import java.util.List;

@Data
public class AddOrderRequest {
    private OrderDto order;
    private List<OrderDetailDto> orderDetails;

    public Boolean isValidRequest(){
        if (!(
                Double.isNaN(order.getTotalAmount()) || order.getTotalAmount() <= 0 ||
                        Double.isNaN(order.getTotalCost()) || order.getTotalCost() <= 0 ||
                        Double.isNaN(order.getTax()) || order.getTax() <= 0 ||
                        order.getPositionCustomer().isEmpty() ||
                        order.getPositionSeller().isEmpty() ||
                        order.getRepresentativeCustomer().isEmpty() ||
                        order.getRepresentativeSeller().isEmpty() ||
                        order.getCustomerId() == null ||
                        order.getSellerId() == null ||
                        orderDetails.isEmpty() ||
                        orderDetails.stream().anyMatch(detail -> detail.getProductId() == null ||
                                Double.isNaN(detail.getMaterialWeight()) || detail.getMaterialWeight() <= 0 ||
                                Double.isNaN(detail.getPrice()) || detail.getPrice() <= 0)
        )) {
            return true;
        }
        return false;
    }
}
