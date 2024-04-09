"use client"
import { customerSchema } from '@/components/CRUDTAB/validatorComponent'
import { AddCustomerField } from '@/data/ComponentData'
import { columnCus } from '@/data/listData';
import GetListComponent from '@/components/List/GetListComponent';
import { apiAddCustomer } from '@/data/apiUrl';


export default function page({ params }: { params: { slug: string } }) {
  return (
    <div>

      <GetListComponent
        slug={'customers'}
        querySlug={'get'}
        columnData={columnCus}
        AddDataField={AddCustomerField}
        dataSchema={customerSchema}
        apiAddData={apiAddCustomer} />
    </div>
  )


}
