package com.app.ConStructCompany.Request;

import com.app.ConStructCompany.utils.ValidateUtils;
import jakarta.validation.constraints.Pattern;
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
    private String positionCustomer;
    private String representativeCustomer;

    @Pattern(regexp = "^0[0-9]{8,11}$", message = "Invalid phone number")
    private String phoneNumber;

    @Override
    public boolean isValidRequest() {
        return !address.isEmpty() && !companyName.isEmpty() && !taxCode.isEmpty() && !positionCustomer.isEmpty() && !representativeCustomer.isEmpty();
    }

    @Override
    public boolean isValidTaxCode() {
        return ValidateUtils.isValidStringOfNumber(taxCode);
    }
}
