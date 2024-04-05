package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.Date;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ordCode")
    @UniqueElements
    private String ordCode;

    @Column(name = "representativeCustomer")
    private String representativeCustomer;

    @Column(name = "representativeSeller")
    private String representativeSeller;

    @Column(name = "positionCustomer")
    private String positionCustomer;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cusId")
    private Customer customer;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerId")
    private Seller seller;

    @Column(name="totalCost")
    private Double totalCost;

    @Column(name = "tax")
    private String tax;

    @Column(name = "totalAmount")
    private Double totalAmount;

    @Column(name = "payment")
    private Double payment;

    @Column(name = "update_at")
    private Date update_at;

    @Column(name = "create_at")
    private Date create_at;

}
