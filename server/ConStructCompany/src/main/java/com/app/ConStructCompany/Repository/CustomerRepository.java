package com.app.ConStructCompany.Repository;

import com.app.ConStructCompany.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
