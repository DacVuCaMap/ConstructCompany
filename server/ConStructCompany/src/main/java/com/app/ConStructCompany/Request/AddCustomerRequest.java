package com.app.ConStructCompany.Request;

import com.app.ConStructCompany.utils.ValidateUtils;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AddCustomerRequest extends CustomerRequest{
    private String address;
    private String companyName;
    private String taxCode;
    private String positionCustomer;
    private String representativeCustomer;

    @Pattern(regexp = "^0[0-9]{8,11}$", message = "Invalid phone number")
    private String phoneNumber;

    @Override
    public boolean isValidRequest() {
        return !address.isEmpty() && !companyName.isEmpty() && !taxCode.isEmpty() && !phoneNumber.isEmpty() && !positionCustomer.isEmpty() && !representativeCustomer.isEmpty();
    }

    @Override
    public boolean isValidTaxCode() {
        return ValidateUtils.isValidStringOfNumber(taxCode);
    }
}
