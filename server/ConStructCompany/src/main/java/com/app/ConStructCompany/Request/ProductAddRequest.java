package com.app.ConStructCompany.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
@Data
public class ProductAddRequest {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String proName;
    @NotBlank(message = "Unit không được để trống")
    private String unit;
    @NotNull(message = "Giá sản phẩm không được để trống")
    private double price;
    @NotNull(message = "Giá trị tồn kho không được để trống")
    private double inventory;

    private String description;

}
