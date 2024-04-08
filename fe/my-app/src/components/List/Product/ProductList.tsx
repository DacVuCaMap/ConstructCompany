"use client"
import AddComponent from '@/components/CRUDTAB/AddComponent'
import { productSchema } from '@/components/CRUDTAB/validatorComponent'
import DataTable from '@/components/DataTable/DataTable'
import { AddProductField } from '@/data/ComponentData'
import { apiAddProduct } from '@/data/apiUrl'
import { columnProduct } from '@/data/listData'
import React, { useState } from 'react'
type Props = {
  data: any[],
  page: string
}

export default function ProductList(props: Props) {
  const [openAdd,setOpenAdd] = useState(false);
  console.log(props)
  return (
    <div className='w-full h-full flex flex-col'>
      PRODUCT
      <div className=''>
        <button onClick={()=>setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </div>
      <DataTable columns={columnProduct} rows={props.data} slug={'product'} />
      <div>
        {openAdd && <AddComponent componentData={AddProductField} validValueSchema={productSchema} slug={'Product'} setOpen={setOpenAdd} apiUrl={apiAddProduct} />}
      </div>
    </div>
  )
}
