package com.app.ConStructCompany.Request;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
@Data
public class ProductEditRequest {

    private Long id;


    private String proName;


    private String unit;


    private Double price;


    private String description;


}
