package com.app.ConStructCompany.Request;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
@Data
public class ProductEditRequest {
    @NotBlank(message = "ID sản phẩm không được để trống")
    private Long id;

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String proName;

    @NotBlank(message = "Unit không được để trống")
    private String unit;

    @NotBlank(message = "Giá sản phẩm không được để trống")
    private Double price;


    private String description;


}
