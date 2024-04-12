"use client"
import AddOrderProduct from '@/components/InvoiceComponents/AddOrderProduct/AddOrderProduct';
import React, { useEffect, useState } from 'react';


export default function Page() {
 
  return (
      <div className={`flex h-full lg:flex-row flex-wrap flex-col gap-4`}>
        <div className='mt-4 flex-auto'>
          <AddOrderProduct />
        
        </div>
      </div>

  );
}