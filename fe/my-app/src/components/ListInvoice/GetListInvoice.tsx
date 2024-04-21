"use client"
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import { columnOrder } from '@/data/listData';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function GetListInvoice() {
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
      <h2 className='text-gray-700 font-bold lg:text-3xl text-lg mb-4'>Danh sách biên bản NT và xác nhận KL</h2>
      <Link
        className="bg-blue-500 hover:bg-blue-700 w-24 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        href={"/invoice/add-order-product"}
      >
        <span className="flex-shrink-0">Tạo</span>
        <Plus className="ml-2 flex-shrink-0" />
      </Link>
      
      <DataTableInvoice columns={columnOrder} rows={data} slug={'order'} validValueSchema={undefined} componentEditData={undefined} />
    </div>
  )
}
