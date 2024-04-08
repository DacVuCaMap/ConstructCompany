package com.app.ConStructCompany.Service.impl;

import com.app.ConStructCompany.Entity.*;
import com.app.ConStructCompany.Repository.*;
import com.app.ConStructCompany.Request.AddOrderRequest;
import com.app.ConStructCompany.Request.dto.OrderDetailDto;
import com.app.ConStructCompany.Response.PostOrderResponse;
import com.app.ConStructCompany.Service.OrderService;
import com.app.ConStructCompany.utils.DateTimeUtils;
import com.app.ConStructCompany.utils.GenerateUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CustomerRepository customerRepository;
    private final SellerRepository sellerRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;

    @Override
    @Transactional
    public PostOrderResponse addOrder(AddOrderRequest addOrderRequest) {
        System.out.println(addOrderRequest);
        try {
            if (!addOrderRequest.isValidRequest()){
                throw new IllegalArgumentException("Các trường nhập là bắt buộc và nhập giá hoặc thuế phải là số");
            }

            Optional<Customer> checkCustomer = customerRepository.findById(addOrderRequest.getOrder().getCustomerId());
            if (!checkCustomer.isPresent()){
                throw new IllegalArgumentException("Không có khách hàng");
            }
            Customer customer = checkCustomer.get();

            Optional<Seller> checkSeller = sellerRepository.findById(addOrderRequest.getOrder().getSellerId());
            if (!checkSeller.isPresent()){
                throw new IllegalArgumentException("Không có người bán");
            }
            Seller seller = checkSeller.get();

            String latestOrderCode = getLatesOrderCode();
            String newOrderCode = GenerateUtils.generateOrderCode(latestOrderCode);
            System.out.println(newOrderCode);
            Order order = new Order();
            order.setPositionCustomer(addOrderRequest.getOrder().getPositionCustomer());
            order.setPositionSeller(addOrderRequest.getOrder().getPositionSeller());
            order.setRepresentativeCustomer(addOrderRequest.getOrder().getRepresentativeCustomer());
            order.setRepresentativeSeller(addOrderRequest.getOrder().getRepresentativeSeller());
            order.setTax(addOrderRequest.getOrder().getTax());
            order.setTotalCost(addOrderRequest.getOrder().getTotalCost());
            order.setTotalAmount(addOrderRequest.getOrder().getTotalAmount());
            order.setIsPaymented(false);
            order.setCustomer(customer);
            order.setSeller(seller);
            order.setCreateAt(DateTimeUtils.getCurrentDate());
            order.setOrderCode(newOrderCode);

            Order newOrder = orderRepository.save(order);

            List<OrderDetail> orderDetails = new ArrayList<>();

            List<OrderDetailDto> orderDetailDtos = addOrderRequest.getOrderDetails();

            for (OrderDetailDto orderDetailDto : orderDetailDtos) {
                Optional<Product> checkProduct = productRepository.findById(orderDetailDto.getProductId());
                if (!checkProduct.isPresent()){
                    throw new IllegalArgumentException("Sản phẩm không tồn tại: " + orderDetailDto.getProductId());
                }
                Product product = checkProduct.get();
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setOrder(newOrder);
                orderDetail.setPrice(orderDetailDto.getPrice());
                orderDetail.setMaterialWeight(orderDetailDto.getMaterialWeight());
                orderDetail.setProduct(product);

                orderDetails.add(orderDetail);
            }

            orderDetailRepository.saveAll(orderDetails);
            Double debt = customer.getDebt()==null ? 0 : customer.getDebt();
            customer.setDebt(debt + addOrderRequest.getOrder().getTotalAmount());
            customerRepository.save(customer);

            return new PostOrderResponse(HttpStatus.OK.value(), "Thêm đơn hàng thành công");
        }catch (IllegalArgumentException ex) {
            return new PostOrderResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return new PostOrderResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Đã xảy ra lỗi khi thêm đơn hàng");
        }
    }

    private String getLatesOrderCode() {
        Order latestOrder = orderRepository.findFirstByOrderByOrderCodeDesc();
        return latestOrder != null ? latestOrder.getOrderCode() : null;
    }
}
