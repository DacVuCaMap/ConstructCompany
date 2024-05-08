"use client"
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import { columnOrder, columnPayment } from '@/data/listData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PaymentDataTable from './PaymentDataTable';


export default function PaymentList({slug}:any) {
  const searchParams = useSearchParams();
  let size = searchParams.get('size');
  let page = searchParams.get('page');
  let search = searchParams.get('search');
  const [data, setData] = useState<object[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData('order', 'list', size, page,"cus"+slug);
        console.log("result", result)
        setData(result);
      } catch (error) {
        setData([]);
      }
    };
    fetchData();
    setLoading(false);
  }, [page]);
  
  return (
    <div className="flex flex-col">
      <Link href={'/invoice/add-order-product'} className='w-36 bg-red-400'>Tạo BBNT và XNKL</Link>
      <PaymentDataTable columns={columnPayment} rows={data} slug={'order'} validValueSchema={undefined} componentEditData={undefined} />
    </div>
  )
}
