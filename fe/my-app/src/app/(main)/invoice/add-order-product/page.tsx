"use client"
import AddOrderProduct from '@/components/InvoiceComponents/AddOrderProduct/AddOrderProduct';
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import { flexResponsive } from '@/data/dataResponsive';
import { columnOrder } from '@/data/listData';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';


export default function Page() {
 
  return (
      <div className={`flex h-full lg:flex-row flex-wrap flex-col gap-4`}>
        <div className='mt-4 flex-auto'>
          <AddOrderProduct />
        
        </div>
      </div>

  );
}