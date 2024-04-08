package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "statistic")
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cusId")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerId")
    private Seller seller;

    @Column(name = "representativeCus")
    private String representativeCus;

    @Column(name = "genderCus")
    private String genderCus;

    @Column(name = "positionCus")
    private String positionCus;

    @Column(name = "positionSell")
    private String positionSell;

    @Column(name = "totalAmount")
    private Double totalAmount;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;
}
