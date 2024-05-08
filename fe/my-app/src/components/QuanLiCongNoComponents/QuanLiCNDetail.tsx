"use client"
import Link from 'next/link'
import React from 'react'

export default function QuanLiCNDetail({ data }: any) {
  return (
    <div className='bg-white p-2 rounded'>
      <h2 className='text-3xl text-gray-800 font-bold'>Khách Hàng</h2>
      <h2 className='text-lg'>Tên Công ty: <span className='font-bold'>{data.companyName}</span></h2>
      <div className='flex flex-col flex-auto text-gray-500'>
        <span>| Địa chỉ: {data.address}</span>
        <span>| Mã số thuế:{data.taxCode}</span>
        <span>| Số điện thoại: {data.phoneNumber}</span>
        <span>| Email: {data.email}</span>
        <Link href={'/customer/list?size=10&page=0&search='+data.taxCode} className='text-blue-500 hover:underline'>Thông tin chi tiết</Link>
      </div>
    </div>
  )
}
