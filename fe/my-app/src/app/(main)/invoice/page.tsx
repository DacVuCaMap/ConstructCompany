"use client"
import GetListComponent from '@/components/List/GetListComponent'
import { flexResponsive } from '@/data/dataResponsive'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col">
      <Link className='text-cyan-600' href={"/invoice/add-order-product"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>

      {/* <GetListComponent slug='order' querySlug={''} columnData={undefined} AddDataField={undefined} dataSchema={undefined} apiAddData={''} EditDataField={undefined} /> */}
    </div>
  )
}
