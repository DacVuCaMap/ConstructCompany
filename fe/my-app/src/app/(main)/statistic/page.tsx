"use client"
import AddOrderProduct from '@/components/InvoiceComponents/AddOrderProduct/AddOrderProduct';
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import { flexResponsive } from '@/data/dataResponsive';
import { columnOrder } from '@/data/listData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

export default function page() {
  // const searchParams = useSearchParams();
  // let size = searchParams.get('size');
  // let page = searchParams.get('page');
  // size = !size ? '10' : size;
  // page = !page ? '0' : page;
  // const [data, setData] = useState<object[]>([])
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getData('order', 'list', size, page);
  //       console.log("result", result)
  //       setData(result);
  //     } catch (error) {
  //       setData([]);
  //     }
  //   };

  //   fetchData();
  //   setLoading(false);
  // }, []);
  return (
    <div className="flex flex-col">
      {/* <h2 className='text-gray-700 font-bold text-4xl mb-4'>Danh sách biên bản Nghiệm thu khối lượng và giá trị</h2>
      <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href={"/statistic/add-statistic"}>Tạo Biên Bản Nghiệm Thu và Xác Nhận Khối Lượng</Link>
      <DataTableInvoice columns={columnOrder} rows={data} slug={'order'} validValueSchema={undefined} componentEditData={undefined} /> */}
    </div>
  )
}
