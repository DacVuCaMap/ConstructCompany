"use client"
import { notFound, useSearchParams } from 'next/navigation';
import getData from './getData';
import AddComponent from '@/components/CRUDTAB/AddComponent'
import { productSchema } from '@/components/CRUDTAB/validatorComponent'
import DataTable from '@/components/DataTable/DataTable'
import { AddCustomerField } from '@/data/ComponentData'
import { apiAddCustomer } from '@/data/apiUrl'
import { useEffect, useState } from 'react';
import { columnCus } from '@/data/listData';


export default function page({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const page = searchParams.get('page');
  const [data, setData] = useState<object[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(params.slug, size, page); // Sử dụng await để chờ promise được giải quyết
        setData(result); // Cập nhật state với dữ liệu trả về từ hàm getData
      } catch (error) {
        setData([]);
      }
    };

    fetchData();
  }, [params.slug, size, page]);
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className='w-full bg-black h-full flex flex-col'>
      CUSTOMER
      <div className='m-5'>
        <button onClick={() => setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Customer
        </button>
      </div>
      <DataTable columns={columnCus} rows={data} slug={'customer'} />
      <div>
        {openAdd && <AddComponent componentData={AddCustomerField} validValueSchema={productSchema} slug={'Cutomer'} setOpen={setOpenAdd} apiUrl={apiAddCustomer} />}
      </div>
    </div>
  )


}
