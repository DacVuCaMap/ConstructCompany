"use client"
import AddOrderProduct from '@/components/InvoiceComponents/AddOrderProduct/AddOrderProduct';
import { flexResponsive } from '@/data/dataResponsive';
import React from 'react';
import * as yup from 'yup';


export default function Page() {
  return (
    <div className={`flex h-full bg-blue-600 lg:flex-row flex-wrap flex-col gap-4`}>
      <div className='m-2 flex-auto'>
        <AddOrderProduct />
      </div>
      <div className='m-2 flex-auto'>
        <AddOrderProduct />
      </div>
      <div className='m-2 flex-auto'>
        <AddOrderProduct />
      </div>
    </div>

  );
}