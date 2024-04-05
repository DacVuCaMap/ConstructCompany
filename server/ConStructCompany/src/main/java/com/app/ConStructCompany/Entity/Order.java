package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "order")
@Data
public class Order {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "representativeCustomer")
    private String representativeCustomer;

    @Column(name = "representativeSeller")
    private String representativeSeller;

    @Column(name = "positionCustomer")
    private String positionCustomer;

    @Column(name = "cusId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Customer customer;

    @Column(name = "sellerId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Seller seller;

    @Column(name="totalCost")
    private Double totalCost;

    @Column(name = "tax")
    private String tax;

    @Column(name = "totalAmount")
    private Double totalAmount;

    @Column(name = "update_at")
    private Date update_at;

    @Column(name = "create_at")
    private Date create_at;

}
