package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Table(name = "product")
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "proName")
    private String proName;

    @Column(name = "unit")
    private String unit;

    @Column(name = "price")
    private Double price;

    @Column(name = "description")
    private String description;

    @Column(name = "update_at")
    private Date update_at;

    @Column(name = "create_at")
    private Date create_at;
}
