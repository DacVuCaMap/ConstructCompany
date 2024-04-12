package com.app.ConStructCompany.Controller;

import com.app.ConStructCompany.Entity.Statistic;
import com.app.ConStructCompany.Request.StatisticRequest;
import com.app.ConStructCompany.Service.StatisticService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    private StatisticService statisticService;

    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getStatistic(@RequestParam Integer size, @RequestParam Integer page) {
        PageRequest pageRequest = PageRequest.of(page,size);
        Page<Statistic> statisticPage = statisticService.findAll(pageRequest);
        return ResponseEntity.ok(statisticPage);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addStatistic(@RequestBody StatisticRequest statisticRequest) {
        Statistic statistic = statisticService.addStatistic(statisticRequest);
        if(statistic!=null){
            return ResponseEntity.ok(statistic);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy id của khách hàng hoặc người bán!");
        }
    }
}
