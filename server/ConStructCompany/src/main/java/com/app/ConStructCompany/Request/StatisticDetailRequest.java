package com.app.ConStructCompany.Request;

import lombok.Data;

import java.util.Date;
@Data
public class StatisticDetailRequest {
    private Long statisticID;
    private Date day;
    private String licensePlate;
    private String trailer;
    private Integer ticket;
    private String typeProduct;
    private Double materialWeight;
    private Double price;
    private Double totalAmount;
    private String note;
}
