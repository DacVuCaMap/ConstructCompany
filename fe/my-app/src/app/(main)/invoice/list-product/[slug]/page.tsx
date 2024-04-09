"use client"
import DataTable from '@/components/DataTable/DataTable';
import getData from '@/components/List/getData';
import LoadingScene from '@/components/LoadingScene';
import { columnOrder } from '@/data/listData';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function page({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const page = searchParams.get('page');
  const [data, setData] = useState<object[]>([])
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData('customers',params.slug, size, page);
        console.log("result",result)
        setData(result);
      } catch (error) {
        setData([]);
      }
    };

    fetchData();
    setLoading(false);
  }, [params.slug, size, page]);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className='w-full h-full flex flex-col'>
      CUSTOMER
      <div className='m-5'>
        <button onClick={() => setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Customer
        </button>
      </div>
      {loading ? <LoadingScene /> : <DataTable columns={columnOrder} rows={data} slug={'customer'} />}
    </div>
  )


}

