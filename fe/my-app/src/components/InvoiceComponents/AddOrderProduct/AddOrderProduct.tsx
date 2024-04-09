"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './AddOrderProduct.scss';
import TableOrder from '../TableOrder/TableOrder';
import OpenWindowSearchCus from '../OpenWindowSearchCus/OpenWindowSearchCus';
import { sellerData } from '@/data/data';
import postData from '@/ApiPattern/PostPattern';

// Định nghĩa schema validation bằng Yup
const schema = yup.object().shape({
    customerId: yup.string().required("Không để trống customer"),
    representativeSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionCustomer: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    representativeCustomer: yup.string().required("Không để trống"),
    sellerId: yup.number().required("Khong de trong"),
    Tax: yup.string(),
    TotalCost: yup.number(),
});

export default function AddOrderProduct() {
    const sellerDt = sellerData;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [customer,setCustomer] = useState<any>();
    const [showWindow, setShowWindow] = useState(false);
    const [orderDetail,setOrderDetail] = useState<any>();
    const [costItem, setCostItem] = useState<any>({ totalCost: 0, tax: '', totalAmount: 0 });
    const [checkSubmit,setCheckSubmit] = useState(false);
    // const [cost,setCost] = useState<any>();
    const inpRef = useRef(null);
    useEffect(() => {
        if (customer && customer.id) {
          setValue('customerId', customer.id);
        }
      }, [customer, setValue]);
    const handleOpenWindow=()=>{
        setShowWindow(true);
    }
    // update cost
    const updateCost = (newCostItem:any)=>{
        setCostItem(newCostItem);
    }
    const onSubmit = async (data: any) => {
        setCheckSubmit(!checkSubmit);
        console.log(checkSubmit);
        let urlPost = process.env.NEXT_PUBLIC_API_URL+'/api/order/add-order'
        console.log(urlPost);

        const dataPost = {order:{...data,...costItem},orderDetails:orderDetail}
        console.log("dataPost",dataPost)

        const post = await postData(urlPost,dataPost,{});
        console.log(post)
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
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.customerId ? 'border-red-500' : ''}`}
                                id="1"
                                type="text"
                                readOnly
                                placeholder='Nhấn để chọn Công Ty'
                                onClick={()=>handleOpenWindow()}
                                value={customer?.companyName}   />
                                <input type="hidden" value={customer?.id} {...register('customerId')} />
                            {errors.customerId && (
                                <p className="text-red-500 text-xs italic">{errors.customerId.message}</p>
                            )}
                            {showWindow && <OpenWindowSearchCus setOpen={setShowWindow} setCustomer={setCustomer}/>}
                        </div>
                        <div className='flex pb-4 mb-4 border-b border-neutral-400'>
                            <div className='mr-1'>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Người Đại diện(Bên mua):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.representativeCustomer ? 'border-red-500' : ''}`}
                                    id="2"
                                    type="text"
                                    placeholder='Người đại diện'
                                    {...register('representativeCustomer')} />
                                {errors.representativeCustomer && (
                                    <p className="text-red-500 text-xs italic">{errors.representativeCustomer.message}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Chức Vụ(Bên mua):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.positionCustomer ? 'border-red-500' : ''}`}
                                    id="3"
                                    type="text"
                                    placeholder='Chức vụ người đại diện'
                                    {...register('positionCustomer')} />
                                {errors.positionCustomer && (
                                    <p className="text-red-500 text-xs italic">{errors.positionCustomer.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-5'></div>
                    <div className='flex-auto m-1'>
                        <div className='mb-2'>
                            <label
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Đại diện bên bán
                            </label><input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.sellerId ? 'border-red-500' : ''}`}
                                id="4"
                                type="text"
                                value={sellerDt.companyName} />
                                <input type="hidden" id="5" value={sellerDt.id} {...register('sellerId')} />
                            {errors.sellerId && (
                                <p className="text-red-500 text-xs italic">{errors.sellerId.message}</p>
                            )}
                        </div>
                        <div className='flex mb-4 pb-4 border-b border-neutral-400'>
                            <div className='mr-1'>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Người Đại diện(Bên bán):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.representativeSeller ? 'border-red-500' : ''}`}
                                    id="1"
                                    type="text"
                                    placeholder='Người đại diện'
                                    {...register('representativeSeller')} />
                                {errors.representativeSeller && (
                                    <p className="text-red-500 text-xs italic">{errors.representativeSeller.message}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Chức Vụ(Bên bán):
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.positionSeller ? 'border-red-500' : ''}`}
                                    id="1"
                                    type="text"
                                    placeholder='Chức vụ'
                                    {...register('positionSeller')} />
                                {errors.positionSeller && (
                                    <p className="text-red-500 text-xs italic">{errors.positionSeller.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-2 mb-2 '>
                    <TableOrder checkSubmit={checkSubmit} updateCost={updateCost} setOrderDetail={setOrderDetail} />
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