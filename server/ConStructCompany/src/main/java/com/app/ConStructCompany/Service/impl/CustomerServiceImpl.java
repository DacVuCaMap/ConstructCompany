package com.app.ConStructCompany.Service.impl;

import com.app.ConStructCompany.Entity.Customer;
import com.app.ConStructCompany.Repository.CustomerRepository;
import com.app.ConStructCompany.Request.AddCustomerRequest;
import com.app.ConStructCompany.Request.CustomerRequest;
import com.app.ConStructCompany.Request.DeleteCustomerRequest;
import com.app.ConStructCompany.Request.EditCustomerRequest;
import com.app.ConStructCompany.Response.PostCustomerResponse;
import com.app.ConStructCompany.Service.CustomerService;
import com.app.ConStructCompany.utils.DateTimeUtils;
import com.app.ConStructCompany.utils.ValidateUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Override
    public PostCustomerResponse addCustomer(AddCustomerRequest addCustomerRequest) {

        if (!addCustomerRequest.isValidRequest()){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Thông tin nhập vào là bắt buộc");
        }

        if (!addCustomerRequest.isValidTaxCode()){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Mã số thuế phải là chuỗi số");
        }

        Customer checkTaxCode = customerRepository.findByTaxCode(addCustomerRequest.getTaxCode());
        if (!ObjectUtils.isEmpty(checkTaxCode)){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Mã số thuế đã bị trùng");
        }

        Customer customer = new Customer();
        customer.setAddress(addCustomerRequest.getAddress());
        customer.setCompanyName(addCustomerRequest.getCompanyName());
        customer.setTaxCode(addCustomerRequest.getTaxCode());
        customer.setCreateAt(DateTimeUtils.getCurrentDate());
        customer.setIsDeleted(false);
        customerRepository.save(customer);

        return new PostCustomerResponse(HttpStatus.OK.value(), "Tạo khách hàng mới thành công");
    }

    @Override
    public PostCustomerResponse editCustomer(EditCustomerRequest editCustomerRequest) {
        if (!editCustomerRequest.isValidRequest()){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Thông tin nhập vào là bắt buộc");
        }

        if (!editCustomerRequest.isValidTaxCode()){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Mã số thuế phải là chuỗi số");
        }

        Customer checkTaxCode = customerRepository.findByTaxCode(editCustomerRequest.getTaxCode());
        if (!ObjectUtils.isEmpty(checkTaxCode)){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Mã số thuế đã bị trùng");
        }

        Optional<Customer> checkCustomer = customerRepository.findById(editCustomerRequest.getId());
        if (!checkCustomer.isPresent()){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Không tồn tại khách hàng");
        }
        Customer customer = checkCustomer.get();
        customer.setAddress(editCustomerRequest.getAddress());
        customer.setCompanyName(editCustomerRequest.getCompanyName());
        customer.setDebt(editCustomerRequest.getDebt());
        customer.setUpdateAt(DateTimeUtils.getCurrentDate());
        customerRepository.save(customer);
        return new PostCustomerResponse(HttpStatus.OK.value(), "Thay đổi thông tin khách hàng thành công");
    }

    @Override
    public PostCustomerResponse deleteCustomer(Long id) {
        Optional<Customer> checkCustomer = customerRepository.findById(id);
        if (!checkCustomer.isPresent()){
            return new PostCustomerResponse(HttpStatus.BAD_REQUEST.value(), "Không tồn tại khách hàng");
        }
        Customer customer = checkCustomer.get();
        customer.setIsDeleted(true);
        customer.setDeletedAt(DateTimeUtils.getCurrentDate());
        customerRepository.save(customer);
        return new PostCustomerResponse(HttpStatus.OK.value(), "Xóa khách hàng thành công");
    }

}
