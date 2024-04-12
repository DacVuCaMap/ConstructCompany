package com.app.ConStructCompany.Request;

import lombok.Data;

@Data
public class StatisticRequest {
    private Long cusId;
    private Long sellerId;
    private String representativeCus;
    private String genderCus;
    private String representativeSell;
    private String genderSell;
    private String positionCus;
    private String positionSell;
    private Double totalAmount;
}
