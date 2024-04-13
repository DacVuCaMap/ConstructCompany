
import getData from '@/components/List/getData';
import DataTableInvoice from '@/components/ListInvoice/DataTableInvoice';
import GetListInvoice from '@/components/ListInvoice/GetListInvoice';
import { columnOrder } from '@/data/listData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
export default function page() {
  return (
    <div>
      <GetListInvoice />
    </div>
  )
}
