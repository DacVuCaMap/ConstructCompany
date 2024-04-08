"use client"
import { flexResponsive } from '@/data/dataResponsive'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="h-screen flex flex-col">
      <Link href={"/invoice/add-order-product"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>
      <Link href={"/invoice/add-order-product"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>
      <Link href={"/invoice/add-order-product"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>
    </div>
  )
}
