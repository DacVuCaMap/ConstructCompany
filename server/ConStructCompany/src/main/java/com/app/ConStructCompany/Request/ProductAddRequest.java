package com.app.ConStructCompany.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
@Data
public class ProductAddRequest {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String proName;
    @NotBlank(message = "Unit không được để trống")
    private String unit;
    @NotBlank(message = "Giá sản phẩm không được để trống")
    private double price;

    private String description;

}
