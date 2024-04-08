"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './AddOrderProduct.scss';
import TableOrder from '../TableOrder/TableOrder';
import OpenWindowSearchCus from '../OpenWindowSearchCus/OpenWindowSearchCus';
import { sellerData } from '@/data/data';

// Định nghĩa schema validation bằng Yup
const schema = yup.object().shape({
    name: yup.string().required('Tên không được để trống'),
    email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu không được để trống'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
        .required('Xác nhận mật khẩu không được để trống'),
    cusId: yup.string().required("Không để trống"),
    represenativeSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionCustomer: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    represenativeCustomer: yup.string().required("Không để trống"),
    sellerId: yup.string().required("Khong de trong"),
    Tax: yup.string(),
    TotalCost: yup.number(),
});

export default function AddOrderProduct() {
    const sellerDt = sellerData;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [customer,setCustomer] = useState<{id:string,companyName:string}>();
    const [showWindow, setShowWindow] = useState(false);
    const handleOpenWindow=()=>{
        setShowWindow(true);
    }
    const onSubmit = (data: any) => {
        console.log(data);
    };

    const data = [
        [{ value: "vnila" }, { value: "conccas" }]
    ]
    return (
        <div className="flex justify-center items-center h-full  ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full lg:max-w-5xl  "
            >
                <h2 className='block text-3xl text-gray-900 font-bold mb-4'>Biên bản nghiệm thu và xác nhận khối lượng</h2>
                <div className={`flex lg:flex-row flex-col`}>
                    <div className='flex-auto m-1'>
                        <div className='mb-2'>
                            <label
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Đại diện bên mua:
                            </label><input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                id="1"
                                type="text"
                                placeholder='Nhập tên Công ty hoặc mã số thuế'
                                onFocus={handleOpenWindow}   />
                                <input type="hidden" value={customer?.id} {...register('cusId')} />
                            {errors.name && (
                                <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                            )}
                            {showWindow && <OpenWindowSearchCus setOpen={setShowWindow} />}
                        </div>
                        <div className='flex pb-4 mb-4 border-b border-neutral-400'>
                            <div className='mr-1'>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Người Đại diện(Bên mua):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                    id="2"
                                    type="text"
                                    placeholder='Người đại diện'
                                    {...register('represenativeCustomer')} />
                                {errors.name && (
                                    <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Chức Vụ(Bên mua):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                    id="3"
                                    type="text"
                                    placeholder='Chức vụ người đại diện'
                                    {...register('positionCustomer')} />
                                {errors.name && (
                                    <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-10'></div>
                    <div className='flex-auto m-1'>
                        <div className='mb-2'>
                            <label
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Đại diện bên bán
                            </label><input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                id="4"
                                type="text"
                                value={sellerDt.companyName} />
                                <input type="hiddent" id="5" value={sellerDt.id} {...register('sellerId')} />
                            {errors.name && (
                                <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                            )}
                        </div>
                        <div className='flex mb-4 pb-4 border-b border-neutral-400'>
                            <div className='mr-1'>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Người Đại diện(Bên bán):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                    id="1"
                                    type="text"
                                    {...register('represenativeSeller')} />
                                {errors.name && (
                                    <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Chức Vụ(Bên bán):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                    id="1"
                                    type="text"
                                    {...register('positionSeller')} />
                                {errors.name && (
                                    <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-2 mb-2 '>
                    <TableOrder />
                </div>


                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Lưu Dữ Liệu
                    </button>
                </div>
            </form>
        </div>
    );
}