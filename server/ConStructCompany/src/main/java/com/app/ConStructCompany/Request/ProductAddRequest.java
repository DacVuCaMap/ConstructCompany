package com.app.ConStructCompany.Request;

import lombok.Data;

import java.util.Date;
@Data
public class ProductAddRequest {

    private String proName;

    private String unit;
    private double price;

    private String description;


}
