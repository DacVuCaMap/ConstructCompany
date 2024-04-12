package com.app.ConStructCompany.Service;

import com.app.ConStructCompany.Entity.Customer;
import com.app.ConStructCompany.Entity.Seller;
import com.app.ConStructCompany.Entity.Statistic;
import com.app.ConStructCompany.Repository.CustomerRepository;
import com.app.ConStructCompany.Repository.SellerRepository;
import com.app.ConStructCompany.Repository.StatisticRepository;
import com.app.ConStructCompany.Request.StatisticRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class StatisticService {

    private final StatisticRepository statisticRepository;
    private final CustomerRepository customerRepository;
    private final SellerRepository sellerRepository;


    public Page<Statistic> findAll(Pageable pageable){
        Page<Statistic> statisticPage  = statisticRepository.findAll(pageable);
        return statisticPage;
    }

    public Statistic addStatistic(StatisticRequest statisticRequest){
        Statistic statistic = new Statistic();
        Optional<Customer> OptionCustomer = customerRepository.findById(statisticRequest.getCusId());
        Optional<Seller> OptionalSeller = sellerRepository.findById(statisticRequest.getSellerId());
        if(OptionCustomer.isPresent() && OptionalSeller.isPresent()){
            Customer customer = OptionCustomer.get();
            Seller seller = OptionalSeller.get();
            statistic.setCustomer(customer);
            statistic.setSeller(seller);
            statistic.setGenderCus(statisticRequest.getGenderCus());
            statistic.setPositionCus(statisticRequest.getPositionCus());
            statistic.setPositionSell(statisticRequest.getPositionSell());
            statistic.setGenderSell(statisticRequest.getGenderSell());
            statistic.setTotalAmount(statistic.getTotalAmount());
            statistic.setCreateAt(new Date());
            Statistic statisticSaved = statisticRepository.save(statistic);
            return statisticSaved;
        }else {
            return null;
        }
    }


}
