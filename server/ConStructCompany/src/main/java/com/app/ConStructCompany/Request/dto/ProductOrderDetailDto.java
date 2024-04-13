package com.app.ConStructCompany.Request.dto;

import com.app.ConStructCompany.Entity.OrderDetail;
import com.app.ConStructCompany.Entity.Product;
import lombok.Data;


@Data
public class ProductOrderDetailDto {
    private Double materialWeight;
    private Double totalPrice;
    private Product product;
    private Double price;
    public static ProductOrderDetailDto getProductOrderDetail(OrderDetail orderDetail){
        ProductOrderDetailDto productOrderDetailDto = new ProductOrderDetailDto();
        productOrderDetailDto.setMaterialWeight(orderDetail.getMaterialWeight());
        productOrderDetailDto.setTotalPrice(orderDetail.getPrice());
        productOrderDetailDto.setProduct(orderDetail.getProduct());
        productOrderDetailDto.setPrice(orderDetail.getPrice());
        return productOrderDetailDto;
    }
}
