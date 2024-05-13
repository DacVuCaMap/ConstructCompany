"use client"
import { formatNumberWithDot } from '@/data/listData'
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
      <div className='flex flex-col flex-auto border-t'>
        <table>
          <tr>
            <td><span>Tổng đang thanh toán:</span></td>
            <td className='border-l pl-4'><span className='font-bold'>{formatNumberWithDot(data.totalDebt,2)}</span></td>
          </tr>
          <tr>
            <td><span>Tổng tiền còn lại:</span></td>
            <td className='border-l pl-4'><span className='font-bold'>{formatNumberWithDot(data.payDebt,2)}</span></td>
          </tr>
          <tr>
            <td><span>Tổng tiền đã thanh toán:</span></td>
            <td className='border-l pl-4'><span className='font-bold'>{formatNumberWithDot(data.totalDebt-data.payDebt,2)}</span></td>
          </tr>
        </table>
      </div>
    </div>
  )
}
