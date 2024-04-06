package com.app.ConStructCompany.Request;

import com.app.ConStructCompany.utils.ValidateUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditCustomerRequest extends CustomerRequest{
    private Long id;
    private String address;
    private String companyName;
    private String taxCode;
    private Double debt;

    @Override
    public boolean isValidRequest() {
        return !address.isEmpty() && !companyName.isEmpty() && !taxCode.isEmpty();
    }

    @Override
    public boolean isValidTaxCode() {
        return ValidateUtils.isValidStringOfNumber(taxCode);
    }
}
