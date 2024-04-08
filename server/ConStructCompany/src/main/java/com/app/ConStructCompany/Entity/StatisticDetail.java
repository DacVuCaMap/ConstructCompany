package com.app.ConStructCompany.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "statisticDetail")
@Data
public class StatisticDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statisticId")
    private Statistic statistic;

    @Column(name = "day")
    private Date day;

    @Column(name = "licensePlate")
    private String licensePlate;

    @Column(name = "trailer")
    private String trailer;

    @Column(name = "ticket")
    private Integer ticket;

    @Column(name = "typeProduct")
    private String typeProduct;

    @Column(name = "materialWeight")
    private Double materialWeight;

    @Column(name = "price")
    private Double price;

    @Column(name = "totalAmount")
    private Double totalAmount;

    @Column(name = "note")
    private String note;

}
