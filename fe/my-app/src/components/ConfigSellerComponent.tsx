"use client"
import { HardHat } from 'lucide-react'
import React, { useState } from 'react'
import './ConfigSellerCss/ConfigSellerCss.css'
import postData from '@/ApiPattern/PostPattern'
// import WriteObjectToJson from './WriteObjectToJson'
import path from 'path';
type Seller = {
    id: any, companyName: string, address: string
    , taxCode: string, representativeSeller: string,
    positionSeller: string, phoneNumber: string, accountBankName: string,
    accountBankNumber: string, bankName: string
}
export default function ConfigSellerComponent({ data }: any) {
    console.log(data);
    const [errors, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);
    const [items, setItem] = useState<Seller>(
        {
            id: data.id,
            companyName: data.companyName,
            address: data.address,
            taxCode: data.taxCode,
            representativeSeller: data.representativeSeller,
            positionSeller: data.positionSeller,
            phoneNumber: data.phoneNumber,
            accountBankName: data.accountBankName,
            accountBankNumber: data.accountBankNumber,
            bankName: data.bankName
        });
    const handleInput = (value: any, key: string) => {
        setItem({ ...items, [key]: value });
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError([]);
        setSuccess(false);
        let checkErr: string[] = [];
        Object.entries(items).forEach(([key, value]) => {
            if (!value) {
                console.log(key)
                checkErr.push(key);
            }
        });
        setError(checkErr);
        if (errors.length > 0) {
            return;
        }
        let url = process.env.NEXT_PUBLIC_API_URL + '/api/seller/update';
        const response = await postData(url, items, {})
        //ghi de json
        // console.log(response)
        if (response === 'success') {
            setSuccess(true);
        }
    }
    return (
        <div className='flex flex-1 justify-center '>
            <div className="bg-white shadow-md rounded-lg px-8 py-8 relative text-black w-full max-w-5xl">
                <div>
                    <div className="h-20"></div>
                    <div className="flex items-center mb-6 bg-slate-900 text-white absolute left-0 top-6 py-2 px-6">
                        <HardHat className="mr-2" />
                        <h2 className="ml-2 font-bold">TIEN DONG COMPANY</h2>
                    </div>
                    <p className="block text-3xl text-gray-900 font-bold mb-4">Thông tin Công ty</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex lg:flex-row flex-col w-full justify-around'>
                        <div className="rounded-lg space-y-4 mb-10 w-auto">
                            <h2 className='border-b border-slate-300'>THÔNG TIN</h2>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Tên Công ty: </label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.companyName} onChange={(e) => handleInput(e.target.value, 'companyName')} />
                            </div>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Địa chỉ: </label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.address} onChange={(e) => handleInput(e.target.value, 'address')} />
                            </div>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Mã số thuế:</label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.taxCode} onChange={(e) => handleInput(e.target.value, 'taxCode')} />
                            </div>
                            <div className='flex flex-row'>
                                <div className='space-x-3 flex flex-col'>
                                    <label className='font-bold'> Người đại diện :</label>
                                    <input type="text" className='h-10 w-56 outline-none bg-gray-300 rounded p-4' value={items.representativeSeller} onChange={(e) => handleInput(e.target.value, 'representativeSeller')} />
                                </div>
                                <div className='space-x-3 flex flex-col'>
                                    <label className='font-bold'> Chức vụ:</label>
                                    <input type="text" className='h-10 w-44 outline-none bg-gray-300 rounded p-4' value={items.positionSeller} onChange={(e) => handleInput(e.target.value, 'positionSeller')} />
                                </div>
                            </div>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Số điện thoại:</label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.phoneNumber} onChange={(e) => handleInput(e.target.value, 'phoneNumber')} />
                            </div>

                        </div>
                        <div className='rounded-lg space-y-4 mb-10'>
                            <h2 className='border-b border-slate-300'>THÔNG TIN NGÂN HÀNG</h2>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Tên TK Ngân Hàng:</label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.accountBankName} onChange={(e) => handleInput(e.target.value, 'accountBankName')} />
                            </div>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Số TK Ngân Hàng:</label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.accountBankNumber} onChange={(e) => handleInput(e.target.value, 'accountBankNumber')} />
                            </div>
                            <div className='space-x-3 flex flex-col'>
                                <label className='font-bold'> Tên Tài Khoản Ngân Hàng:</label>
                                <input type="text" className='h-10 outline-none bg-gray-300 rounded p-4' value={items.bankName} onChange={(e) => handleInput(e.target.value, 'bankName')} />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Lưu Dữ Liệu
                        </button>
                        {errors.length > 0 && (
                            <div className='text-red-600 font-bold'>
                                <span>Lỗi: </span>
                                {errors.map((error, index) => (
                                    <span key={index}>{error},</span>
                                ))}
                            </div>
                        )}
                        {success && <span className='text-greend-500 font-bold'>Lưu thành công</span>}
                    </div>
                </form>


            </div>
        </div>
    )
}
