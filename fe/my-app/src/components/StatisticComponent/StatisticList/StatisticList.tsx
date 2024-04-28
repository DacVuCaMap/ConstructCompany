"use client"
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import StatisticDataTable from '../StatisticDataTable/StatisticDataTable';
import { columnStatistic } from '@/data/listData';
import GetPattern from '@/ApiPattern/GetPattern';
import { Plus } from 'lucide-react';
type Props={
  totalLeft:number
}
export default function StatisticList(props:Props) {
  const searchParams = useSearchParams();
  let size = searchParams.get('size');
  let page = searchParams.get('page');
  let search = searchParams.get('search');
  search = search ? search : '';
  const [data, setData] = useState<object[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/statistic/get?page=${page}&size=${size}&search=${search}`
        const result = await GetPattern(url, {});
        console.log("result", result.content)

        setData(result.content);
      } catch (error) {
        setData([]);
      }
    };
    fetchData();
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-col">
      <h2 className='text-gray-700 font-bold lg:text-3xl text-lg mb-4'>DANH SÁCH BIÊN BẢN NGHIỆM THU VÀ GIÁ TRỊ</h2>
      <Link className="bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center" href={"/statistic/add-statistic"}>
        Tạo mới
        <Plus className="ml-2 flex-shrink-0" />
        </Link>
      {!loading && <StatisticDataTable totalLeft={props.totalLeft} columns={columnStatistic} rows={data} slug={'statistic'} />}
    </div>
  )
}
