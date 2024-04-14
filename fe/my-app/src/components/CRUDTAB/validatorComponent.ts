import * as yup from 'yup';

export const productSchema = yup.object().shape({
  proName: yup.string().required("Không để trống"),
  unit: yup.string().required("Không để trống"),
  inventory: yup.number().required("Không để trống"),
  price: yup.number().required("Không để trống"),
  importPrice:yup.number().required("Không để trống"),
  description: yup.string()
});

export const customerSchema = yup.object().shape({
  companyName: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
  address: yup.string().required("Không để trống"),
  taxCode: yup.number(),
  phoneNumber:yup.string().required('Không để trống').matches(/^[0-9]*$/, 'Phải là số'),
  representativeCustomer:yup.string().required("Không để trống"),
  positionCustomer:yup.string().required("Không để trống"),
  email:yup.string().email('Phải là email').required('Không để trống')
});