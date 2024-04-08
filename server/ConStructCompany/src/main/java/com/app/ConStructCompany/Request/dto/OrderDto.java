package com.app.ConStructCompany.Request.dto;

import lombok.Data;

@Data
public class OrderDto {
    private String representativeCustomer;
    private String representativeSeller;
    private String positionCustomer;
    private Double totalCost;
    private Double tax;
    private Double totalAmount;
    private Long customerId;
    private Long sellerId;
}
