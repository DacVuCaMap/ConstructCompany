"use client"
import AddOrderProduct from '@/components/InvoiceComponents/AddOrderProduct/AddOrderProduct';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import { flexResponsive } from '@/data/dataResponsive';
import React from 'react';
import * as yup from 'yup';


export default function Page() {
  return (
    <div className={`flex h-full lg:flex-row flex-wrap flex-col gap-4`}>
      <div className='mt-4 flex-auto'>
        <AddOrderProduct />
        <DataTableInvoice />
      </div>
    </div>

  );
}