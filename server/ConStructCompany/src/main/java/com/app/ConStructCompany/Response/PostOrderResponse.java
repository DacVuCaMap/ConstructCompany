package com.app.ConStructCompany.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostOrderResponse {
    private int status;
    private String message;
}
