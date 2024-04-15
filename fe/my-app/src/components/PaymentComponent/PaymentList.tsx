"use client"
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import { columnOrder } from '@/data/listData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PaymentDataTable from './PaymentDataTable';


export default function PaymentList() {
  const searchParams = useSearchParams();
  let size = searchParams.get('size');
  let page = searchParams.get('page');
  const [data, setData] = useState<object[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData('order', 'list', size, page);
        console.log("result", result)
        setData(result);
      } catch (error) {
        setData([]);
      }
    };
    fetchData();
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-col">
      <h2 className='text-gray-700 font-bold text-4xl mb-4'>Danh sách PDF giấy đề nghị thanh toán</h2>
      <PaymentDataTable columns={columnOrder} rows={data} slug={'order'} validValueSchema={undefined} componentEditData={undefined} />
    </div>
  )
}
