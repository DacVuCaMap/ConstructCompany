package com.app.ConStructCompany.utils;

public class GenerateUtils {
    public static final int BEGIN_SUBSTRING_INDEX = 6; // Start after "140424"
    public static final int DEFAULT_PLUS_VALUE = 1;
    public static final int DEFAULT_ORDER_NUMBER = 1;
    public static final String DEFAULT_ORDER_CODE_PATTERN = "ddMMyy";
    public GenerateUtils(){}

    public static String generateOrderCode(String currentOrderCode){
        int nextOrderNumber = DEFAULT_ORDER_NUMBER;

        String currentDateFormat = DateTimeUtils.getDateFormat(DEFAULT_ORDER_CODE_PATTERN);
        if (currentOrderCode != null) {
            nextOrderNumber = Integer.parseInt(currentOrderCode.substring(BEGIN_SUBSTRING_INDEX)) + DEFAULT_PLUS_VALUE;
        }
        return  currentDateFormat + String.valueOf(nextOrderNumber);
    }
}
