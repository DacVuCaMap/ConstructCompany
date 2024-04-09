"use client"
import { flexResponsive } from '@/data/dataResponsive'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col">
      <Link className='text-cyan-600' href={"/invoice/add-order-product"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>
      <Link href={"/invoice/list-order/get?size=10&page=0"}>Danh sách Biên Bản Nghiệm Thu và Xác Nhận Khối lượng</Link>
      <Link href={"/invoice/add-order-product"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>
    </div>
  )
}
