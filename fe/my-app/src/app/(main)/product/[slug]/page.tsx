"use client"
import { productSchema } from '@/components/CRUDTAB/validatorComponent'
import {AddProductField, EditProductField } from '@/data/ComponentData'
import {apiAddProduct } from '@/data/apiUrl'
import { columnProduct } from '@/data/listData';
import GetListComponent from '@/components/List/GetListComponent';


export default function page() {
  return (
    <div>
      <GetListComponent
        slug={'product'}
        nameSlug={'Sản Phẩm'}
        querySlug={'get'}
        columnData={columnProduct}
        AddDataField={AddProductField}
        dataSchema={productSchema}
        apiAddData={apiAddProduct}
        EditDataField={EditProductField} />
    </div>
  )


}
