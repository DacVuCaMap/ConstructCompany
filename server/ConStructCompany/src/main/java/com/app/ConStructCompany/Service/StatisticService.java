package com.app.ConStructCompany.Service;

import com.app.ConStructCompany.Entity.Customer;
import com.app.ConStructCompany.Entity.Seller;
import com.app.ConStructCompany.Entity.Statistic;
import com.app.ConStructCompany.Repository.CustomerRepository;
import com.app.ConStructCompany.Repository.SellerRepository;
import com.app.ConStructCompany.Repository.StatisticRepository;
import com.app.ConStructCompany.Request.StatisticAddRequest;
import com.app.ConStructCompany.Request.StatisticDetailRequest;
import com.app.ConStructCompany.Request.StatisticRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class StatisticService {

    private final StatisticRepository statisticRepository;
    private final CustomerRepository customerRepository;
    private final SellerRepository sellerRepository;
    private final StatisticDetailService statisticDetailService;

    public Page<Statistic> findAll(Pageable pageable){
        Page<Statistic> statisticPage  = statisticRepository.findAll(pageable);
        return statisticPage;
    }

    @Transactional
    public Statistic addStatistic(StatisticAddRequest statisticAddRequest){
        Statistic statistic = new Statistic();
        StatisticRequest statisticRequest = statisticAddRequest.getStatistic();
        List<StatisticDetailRequest> statisticDetailRequests = statisticAddRequest.getStatisticDetails();
        Optional<Customer> OptionCustomer = customerRepository.findById(statisticRequest.getCustomerId());
        Optional<Seller> OptionalSeller = sellerRepository.findById(statisticRequest.getSellerId());
        if(OptionCustomer.isPresent() && OptionalSeller.isPresent()){
            Customer customer = OptionCustomer.get();
            Seller seller = OptionalSeller.get();
            statistic.setCustomer(customer);
            statistic.setSeller(seller);
            statistic.setRepresentativeCustomer(statisticRequest.getRepresentativeCustomer());
            statistic.setPositionCustomer(statisticRequest.getPositionCustomer());
            statistic.setRepresentativeSeller(statisticRequest.getRepresentativeSeller());
            statistic.setPositionSeller(statisticRequest.getPositionSeller());
            statistic.setTotalAmount(statisticRequest.getTotalAmount());
            statistic.setCreateAt(new Date());
            statistic.setIsDeleted(false);
            Statistic statisticSave = statisticRepository.save(statistic);
            for (StatisticDetailRequest statisticDetailRequest : statisticDetailRequests){
                statisticDetailService.addStatisticDetail(statisticDetailRequest,statisticSave);
            }
            return statisticSave;
        }else {
            return null;
        }
    }


}
