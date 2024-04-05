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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordId")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proId")
    private Product product;

    @Column(name = "materialWeight")
    private Double materialWeight;

    @Column(name = "price")
    private Double price;

}
