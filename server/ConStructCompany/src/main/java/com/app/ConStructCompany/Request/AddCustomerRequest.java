package com.app.ConStructCompany.Request;

import com.app.ConStructCompany.utils.ValidateUtils;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AddCustomerRequest extends CustomerRequest{
    private String address;
    private String companyName;
    private String taxCode;

    @Override
    public boolean isValidRequest() {
        return !address.isEmpty() && !companyName.isEmpty() && !taxCode.isEmpty();
    }

    @Override
    public boolean isValidTaxCode() {
        return ValidateUtils.isValidStringOfNumber(taxCode);
    }
}
