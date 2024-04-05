package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.util.Date;

@Entity
@Table(name = "customer")
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "companyName")
    private String companyName;

    @Column(name = "address")
    private String address;
    @Column(name = "taxCode")
    private String taxCode;

    @Column(name = "debt")
    private Double debt;
    @Column(name = "create_at")
    private Date create_at;
}