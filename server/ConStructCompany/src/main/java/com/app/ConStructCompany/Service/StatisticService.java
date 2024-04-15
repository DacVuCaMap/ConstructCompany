package com.app.ConStructCompany.Service;

import com.app.ConStructCompany.Entity.*;
import com.app.ConStructCompany.Repository.CustomerRepository;
import com.app.ConStructCompany.Repository.SellerRepository;
import com.app.ConStructCompany.Repository.StatisticDetailRepository;
import com.app.ConStructCompany.Repository.StatisticRepository;
import com.app.ConStructCompany.Request.StatisticAddRequest;
import com.app.ConStructCompany.Request.StatisticDetailRequest;
import com.app.ConStructCompany.Request.StatisticRequest;
import com.app.ConStructCompany.Request.dto.OrderDetailDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Transactional
@Service
@AllArgsConstructor
public class StatisticService {

    private final StatisticRepository statisticRepository;
    private final CustomerRepository customerRepository;
    private final SellerRepository sellerRepository;
    private final StatisticDetailService statisticDetailService;
    private final StatisticDetailRepository statisticDetailRepository;

    public Page<Statistic> findAll(Pageable pageable) {
        Page<Statistic> statisticPage = statisticRepository.findAllByIsDeletedFalse(pageable);
        return statisticPage;
    }


    public Statistic addStatistic(StatisticAddRequest statisticAddRequest) {
        Statistic statistic = new Statistic();
        StatisticRequest statisticRequest = statisticAddRequest.getStatistic();
        List<StatisticDetailRequest> statisticDetailRequests = statisticAddRequest.getStatisticDetails();
        Optional<Customer> OptionCustomer = customerRepository.findById(statisticRequest.getCustomerId());
        Optional<Seller> OptionalSeller = sellerRepository.findById(statisticRequest.getSellerId());
        if (OptionCustomer.isPresent() && OptionalSeller.isPresent()) {
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
            for (StatisticDetailRequest statisticDetailRequest : statisticDetailRequests) {
                statisticDetailService.addStatisticDetail(statisticDetailRequest, statisticSave);
            }
            return statisticSave;
        } else {
            return null;
        }
    }

    @Transactional
    public ResponseEntity editStatistic(StatisticAddRequest statisticAddRequest) {
        try {
            StatisticRequest statisticRequest = statisticAddRequest.getStatistic();
            List<StatisticDetailRequest> statisticDetailRequests = statisticAddRequest.getStatisticDetails();

            Optional<Customer> optionCustomer = customerRepository.findById(statisticRequest.getCustomerId());
            if (!optionCustomer.isPresent()) {
                throw new IllegalArgumentException("Không tồn tại khách hàng");
            }

            Optional<Seller> optionalSeller = sellerRepository.findById(statisticRequest.getSellerId());
            if (!optionalSeller.isPresent()) {
                throw new IllegalArgumentException("Không tồn tại người bán");
            }

            Customer customer = optionCustomer.get();
            Seller seller = optionalSeller.get();

            Optional<Statistic> checkStatistic = statisticRepository.findById(statisticRequest.getId());
            if (!checkStatistic.isPresent()) {
                throw new IllegalArgumentException("Không tồn tại bảng thống kê");
            }

            Statistic statistic = checkStatistic.get();

            statistic.setCustomer(customer);
            statistic.setSeller(seller);
            statistic.setRepresentativeCustomer(statisticRequest.getRepresentativeCustomer());
            statistic.setPositionCustomer(statisticRequest.getPositionCustomer());
            statistic.setRepresentativeSeller(statisticRequest.getRepresentativeSeller());
            statistic.setPositionSeller(statisticRequest.getPositionSeller());
            statistic.setTotalAmount(statisticRequest.getTotalAmount());
            statistic.setUpdateAt(new Date());

            Statistic statisticSave = statisticRepository.save(statistic);

            Map<Long, StatisticDetail> currentStatisticDetailsMap = new HashMap<>();
            List<StatisticDetail> currentStatisticDetails = statisticDetailRepository.findAllByStatisticId(statisticRequest.getId());
            for (StatisticDetail statisticDetail : currentStatisticDetails) {
                currentStatisticDetailsMap.put(statisticDetail.getId(), statisticDetail);
            }

            for (StatisticDetailRequest statisticDetailRequest : statisticDetailRequests) {
                StatisticDetail existingStatisticDetail = currentStatisticDetailsMap.get(statisticDetailRequest.getStatisticDetailId());
                if (existingStatisticDetail != null) {
                    existingStatisticDetail.setPrice(statisticDetailRequest.getPrice());
                    existingStatisticDetail.setDay(statisticDetailRequest.getDay());
                    existingStatisticDetail.setMaterialWeight(statisticDetailRequest.getMaterialWeight());
                    existingStatisticDetail.setTotalAmount(statisticDetailRequest.getTotalAmount());
                    existingStatisticDetail.setTicket(statisticDetailRequest.getTicket());
                    existingStatisticDetail.setTrailer(statisticDetailRequest.getTrailer());
                    existingStatisticDetail.setLicensePlate(statisticDetailRequest.getLicensePlate());
                    existingStatisticDetail.setTypeProduct(statisticDetailRequest.getTypeProduct());
                    existingStatisticDetail.setNote(statisticDetailRequest.getNote());
                    currentStatisticDetailsMap.remove(statisticDetailRequest.getStatisticDetailId());
                } else {
                    StatisticDetail statisticDetail = new StatisticDetail();
                    statisticDetail.setStatistic(statisticSave);
                    statisticDetail.setPrice(statisticDetailRequest.getPrice());
                    statisticDetail.setDay(statisticDetailRequest.getDay());
                    statisticDetail.setMaterialWeight(statisticDetailRequest.getMaterialWeight());
                    statisticDetail.setTotalAmount(statisticDetailRequest.getTotalAmount());
                    statisticDetail.setTicket(statisticDetailRequest.getTicket());
                    statisticDetail.setTrailer(statisticDetailRequest.getTrailer());
                    statisticDetail.setLicensePlate(statisticDetailRequest.getLicensePlate());
                    statisticDetail.setTypeProduct(statisticDetailRequest.getTypeProduct());
                    statisticDetail.setNote(statisticDetailRequest.getNote());
                    currentStatisticDetails.add(statisticDetail);
                }
            }

            List<StatisticDetail> statisticDetailsToDelete = new ArrayList<>();
            for (StatisticDetail statisticDetailToDelete : currentStatisticDetailsMap.values()) {
                if (!statisticDetailRequests.stream().anyMatch(req -> req.getStatisticDetailId() != null && req.getStatisticDetailId().equals(statisticDetailToDelete.getId()))) {
                    statisticDetailsToDelete.add(statisticDetailToDelete);
                    currentStatisticDetails.remove(statisticDetailToDelete);
                }
            }

            statisticDetailRepository.deleteAll(statisticDetailsToDelete);
            statisticDetailRepository.saveAll(currentStatisticDetails);

            return ResponseEntity.ok("Cập nhật thành công");
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public ResponseEntity<?> deleteStatistic(Long id) {
        Optional<Statistic> checkStatistic = statisticRepository.findById(id);
        if (!checkStatistic.isPresent()) {
            throw new IllegalArgumentException("Không tồn tại bảng thống kê");
        }

        Statistic statistic = checkStatistic.get();
        statistic.setIsDeleted(true);
        statisticRepository.save(statistic);

        return ResponseEntity.ok("Xóa thành công");
    }
}
