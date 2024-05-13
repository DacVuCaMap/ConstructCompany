"use client"
import { columnCus, columnQLCN, formatNumberWithDot } from '@/data/listData'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PaginationComponent from '../List/PaginationComponent/PaginationComponent';
import { useSearchParams } from 'next/navigation';
import getData from '../List/getData';
import GetPattern from '@/ApiPattern/GetPattern';
import './dataTable.scss'
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import SearchCusQLCN from './SearchCusQLCN';
type Props = {
  totalLeft: number
}
export default function QuanLiCNList(props: Props) {
  const route = useRouter()
  const searchParams = useSearchParams();
  let size = searchParams.get('size');
  let page = searchParams.get('page');
  let search = searchParams.get('search');
  const [data, setData] = useState<object[]>([])
  const [loading, setLoading] = useState(true);
  let count = 0;
  const getRowId = () => {
    return count++;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/customers/get-cus?page=${page}&size=${size}`
        const result = await getData('customers', 'get-cus', size, page, search);
        // console.log("result", result)
        setData(result);

      } catch (error) {
        setData([]);
      }
    };
    fetchData();
    setLoading(false);
    console.log(data);
  }, [page]);
  const handleRowClick = (params: any) => {
    console.log(params.row.customer.id);
    route.push(`/quanlicongno/get/${params.row.customer.id}/list?page=0&size=5`);
  }
  const [searchCus,setSearchCus] = useState(false);
  return (
    <div className="">
      <button onClick={()=>setSearchCus(true)} className='bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
        Tạo mới <Plus className="ml-2 flex-shrink-0" />
      </button>
      {searchCus && <SearchCusQLCN setOpen={setSearchCus} />} 
      <div className='dataTable relative flex-1 m-2'>
        <DataGrid
          className="dataGrid hover:cursor-pointer"
          rows={data}
          getRowId={getRowId}
          columns={window.innerWidth < 768 ? [...columnQLCN.slice(0, 3)] : [...columnQLCN]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slotProps={{
            filterPanel: {
              disableAddFilterButton: true,
              disableRemoveAllButton: true,
            },
          }}
          slots={{ toolbar: GridToolbar }}
          disableColumnFilter
          onRowClick={handleRowClick}
        />
        <div className="absolute border-b top-4 left-4 text-xs">
          <span className='text-xs'>Tổng Công Nợ: </span>
          <span className="font-bold text-sm">{formatNumberWithDot(props.totalLeft, 2)} vnđ</span>
        </div>
        <div>
          <PaginationComponent />
        </div>
      </div>


    </div>

  )
}
