package com.app.ConStructCompany.Repository;

import com.app.ConStructCompany.Entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findFirstByOrderByOrderCodeDesc();
    Page<Order> findAllByOrderCodeLikeIgnoreCase(String orderCode, Pageable pageable);
    Page<Order> findAll(Pageable pageable);

}
