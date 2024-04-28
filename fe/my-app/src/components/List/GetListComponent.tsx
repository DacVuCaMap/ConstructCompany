"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LoadingScene from '@/components/LoadingScene'
import DataTable from '@/components/DataTable/DataTable'
import AddComponent from '@/components/CRUDTAB/AddComponent'
import getData from './getData'
type Props = {
  slug: string,
  nameSlug:string,
  querySlug:string,
  columnData:any,
  AddDataField:any,
  dataSchema:any,
  apiAddData:string,
  EditDataField:any
}

export default function GetListComponent(props: Props) {
  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const [data, setData] = useState<object[]>([])
  const [loading,setLoading] = useState(true);
  let firstParams = props.slug==="product" ? props.slug : 'customers';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(firstParams,props.querySlug, size, page,search);
        console.log("result",result)
        setData(result);
      } catch (error) {
        setData([]);
      }
    };

    fetchData();
    setLoading(false);
  }, [props.querySlug, size, page,props.slug]);
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className='w-full h-full flex flex-col'>
      <h2 className='text-gray-700 font-bold text-4xl mb-4'>{props.nameSlug}</h2>
      <div className='m-5'>
        <button onClick={() => setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Thêm {props.nameSlug}
        </button>
      </div>
      {loading ? <LoadingScene /> : <DataTable nameSlug={props.nameSlug} componentEditData={props.EditDataField} validValueSchema={props.dataSchema} columns={props.columnData} rows={data} slug={props.slug} />}
      <div>
        {openAdd && <AddComponent nameSlug={props.nameSlug} componentData={props.AddDataField} validValueSchema={props.dataSchema} slug={props.slug} setOpen={setOpenAdd} apiUrl={props.apiAddData} />}
      </div>
    </div>
  )
}
