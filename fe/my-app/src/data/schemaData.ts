import * as yup from 'yup';

export const schemaOrder = yup.object().shape({
    customerId: yup.number().notOneOf([-1], "Không để trống").required("Không để trống customer"),
    representativeSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionCustomer: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    representativeCustomer: yup.string().required("Không để trống"),
    sellerId: yup.number().required("Khong de trong"),
    Tax: yup.string(),
    TotalCost: yup.number(),
    signingDateForm: yup.date().required('Không bỏ trống'),
});
export const schemaStatistic = yup.object().shape({
    customerId: yup.number().notOneOf([-1], "Không để trống").required("Không để trống customer"),
    representativeSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionCustomer: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    representativeCustomer: yup.string().required("Không để trống"),
    sellerId: yup.number().required("Khong de trong"),
    Tax: yup.string(),
    TotalCost: yup.number(),
});