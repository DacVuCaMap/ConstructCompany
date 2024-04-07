package com.app.ConStructCompany.utils;

public class GenerateUtils {
    public static final String ORDER_CODE_FORMAT = "ORD";
    public static final int BEGIN_SUBSTRING_INDEX = 3;
    public static final int DEFAULT_PLUS_VALUE = 1;
    public static final int DEFAULT_ORDER_NUMBER = 1;
    public GenerateUtils(){}

    public static String generateOrderCode(String currentOrderCode){
        int nextOrderNumber = DEFAULT_ORDER_NUMBER;
        if (currentOrderCode != null) {
            nextOrderNumber = Integer.parseInt(currentOrderCode.substring(BEGIN_SUBSTRING_INDEX)) + DEFAULT_PLUS_VALUE;
        }
        return ORDER_CODE_FORMAT + String.valueOf(nextOrderNumber);
    }
}
