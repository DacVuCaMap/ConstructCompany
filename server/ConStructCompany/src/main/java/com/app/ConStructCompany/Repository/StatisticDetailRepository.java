package com.app.ConStructCompany.Repository;

import com.app.ConStructCompany.Entity.StatisticDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticDetailRepository extends JpaRepository<StatisticDetail, Long> {
    Page<StatisticDetail> findAll(Pageable pageable);
}
