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
import AddStatistic from '../AddStatistic/AddStatistic';
import SearchOrder from '../SearchOrder';
type Props = {
  totalLeft: number
}
type AddType = {
  order: any,
  endDay: Date ,
  startDay: Date,

}
export default function StatisticList(props: Props) {
  const searchParams = useSearchParams();
  let size = searchParams?.get('size');
  let page = searchParams?.get('page');
  let search = searchParams?.get('search');
  search = search ? search : '';
  const [data, setData] = useState<object[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/statistic/get?page=${page}&size=${size}&search=${search}`
        const result = await getData('statistic', 'get', size, page, search);
        setData(result);
      } catch (error) {
        setData([]);
      }
    };
    fetchData();
    setLoading(false);
  }, [page]);
  const [nofErr,setNof] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setConfirm] = useState(false);
  const [dataAdd, setDataAdd] = useState<AddType>({ order: null, endDay: new Date(), startDay: new Date() });
  const handleCancel = () => {
    document.body.style.overflow = 'unset';
    setConfirm(false);
  }
  const handleSetAdd = () =>{
    if (!dataAdd.order || dataAdd.startDay>dataAdd.endDay) {
      setNof("Order null hoặc ngày bắt đầu sau ngày kết thúc")
      return;
    }
    setOpenAdd(true);
  }
  return (
    <div className="flex flex-col">
      {openAdd ?
        <div className=''>
          <AddStatistic order={dataAdd.order} endDay={dataAdd.endDay} startDay={dataAdd.startDay} />
        </div>
        :
        <div>
          <h2 className='text-gray-700 font-bold lg:text-3xl text-lg mb-4'>DANH SÁCH BIÊN BẢN NGHIỆM THU VÀ GIÁ TRỊ</h2>
          {openConfirm &&
            <div onClick={handleCancel} className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 '>
              <div onClick={(e) => e.stopPropagation()} className='bg-white p-10 rounded-lg flex flex-col justify-center lg:w-1/2 w-full'>
                <h2 className='text-gray-700 font-bold text-2xl border-b'>Khởi tạo</h2>
                <p className='text-red-500'>{nofErr}</p>
                <SearchOrder dataAdd={dataAdd} setDataAdd={setDataAdd} />

                <button onClick={handleSetAdd} className='mt-10 bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center'>Confirm</button>
              </div>
            </div>}
          <button className="bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => setConfirm(true)}>
            Tạo mới
            <Plus className="ml-2 flex-shrink-0" />
          </button>

          {!loading && <StatisticDataTable totalLeft={props.totalLeft} columns={columnStatistic} rows={data} slug={'statistic'} />}
        </div>
      }

    </div>
  )
}
