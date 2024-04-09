"use client"
import { notFound, useSearchParams } from 'next/navigation';
import AddComponent from '@/components/CRUDTAB/AddComponent'
import { productSchema } from '@/components/CRUDTAB/validatorComponent'
import DataTable from '@/components/DataTable/DataTable'
import { AddCustomerField, AddProductField } from '@/data/ComponentData'
import { apiAddCustomer, apiAddProduct } from '@/data/apiUrl'
import { useEffect, useState } from 'react';
import { columnCus, columnProduct } from '@/data/listData';
import getData from '@/components/List/getData';
import LoadingScene from '@/components/LoadingScene';


export default function page({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const page = searchParams.get('page');
  const [data, setData] = useState<object[]>([])
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData('product',params.slug, size, page);
        console.log('result',result)
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
      Product
      <div className='m-5'>
        <button onClick={() => setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </div>
      {loading ? <LoadingScene/> : <DataTable columns={columnProduct} rows={data} slug={'product'} />}
      <div>
        {openAdd && <AddComponent componentData={AddProductField} validValueSchema={productSchema} slug={'Product'} setOpen={setOpenAdd} apiUrl={apiAddProduct} />}
      </div>
    </div>
  )


}
