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

    @Column(name = "order_code")
    @UniqueElements
    private String orderCode;

    @Column(name = "representative_customer")
    private String representativeCustomer;

    @Column(name = "representative_seller")
    private String representativeSeller;

    @Column(name = "position_customer")
    private String positionCustomer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerId")
    private Seller seller;

    @Column(name="total_cost")
    private Double totalCost;

    @Column(name = "tax")
    private Double tax;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "is_paymented")
    private Boolean isPaymented;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "create_at")
    private Date createAt;

}
