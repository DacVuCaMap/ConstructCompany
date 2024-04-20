"use client"
import { flexResponsive } from '@/data/dataResponsive';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form';
import postData from '@/ApiPattern/PostPattern';
import { schemaAccount } from '@/data/schemaData';
import { AddAccount } from '@/data/ComponentData';
import { ChevronDown } from 'lucide-react';

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function RegisterAccount(props: Props) {
    const [errorForm, setErrorForm] = useState(false);
    const [change, setChange] = useState(false);
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaAccount),
    });

    const onSubmit = async (data: any) => {
        setErrorForm(false)
        console.log(data);
        const url = process.env.NEXT_PUBLIC_API_URL + '/api/auth/register';
        const response = await postData(url, data, {});
        console.log("response: ", response)
        if (response == null || response.status === 400) {
            setErrorForm(true);
            return;
        }
        console.log(response);
        success
        console.log(data);
        setSuccess(true);
        setChange(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
        reset();
    };
    const handleCancel = () => {
        if (change) {
            window.location.reload();
        }
        props.setOpen(false);
    }
    return (
        <div onClick={handleCancel} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-51 w-full lg:max-w-4xl"
            >
                <h2 className='text-gray-700 font-bold text-4xl mb-4'>Tạo tài khoản</h2>
                {errorForm && (
                    <p className="text-red-500 text-xs italic">Tạo tài khoản không thành công</p>
                )}
                {success && (
                    <p className="text-green-700 italic">Tạo thành công</p>
                )}
                <div className={`flex flex-wrap ${flexResponsive} pb-4 mb-4 border-b border-neutral-400 gap-x-4`}>
                    {AddAccount.map((item: any, index) => (
                        <div key={index} className='flex-auto'>
                            <div className='flex-auto'>
                                <label className="block text-gray-700 font-bold mb-2">
                                    {item.title}
                                </label>
                                <input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[item.field] ? 'border-red-500' : ''}`}
                                    type={item.field==="password" ? "password" : "text"}
                                    {...register(item.field)}
                                />
                                {errors[item.field] && (
                                    <p className="text-red-500 text-xs italic">{(errors[item.field] as FieldError)?.message}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className='flex-auto mb-4 relative'>
                        <label className="block text-gray-700 font-bold mb-2">
                            Quyền
                        </label>
                        <ChevronDown className='absolute right-1 top-10'/>
                        <select
                            required
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors["admin"] ? 'border-red-500' : ''}`}
                            {...register("admin")}
                        >
                            <option value="false">Nhân viên (mặc định)</option>
                            <option value="true">Admin</option>
                        </select>

                        {errors["admin"] && (
                            <p className="text-red-500 text-xs italic">Vui lòng chọn quyền</p>
                        )}
                    </div>
                </div>



                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Hoàn Thành
                    </button>

                </div>
            </form >
        </div >
    )
}
