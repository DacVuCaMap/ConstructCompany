package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Cache;

@Entity
@Table(name = "orderDetail")
@Data
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "ordId")
    @ManyToOne
    @JoinColumn(name = "id")
    private Order order;

    @Column(name = "proId")
    private Product product;

    @Column(name = "materialWeight")
    private Double materialWeight;

    @Column(name = "price")
    private Double price;

}
