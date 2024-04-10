package com.app.ConStructCompany.Request;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class GetOrdersRequest extends PageRequest {
    private String search;
    private PageRequest pageRequest;

    protected GetOrdersRequest(int page, int size, String search) {
        super(page, size, Sort.unsorted());
        this.search = search;
    }
}
