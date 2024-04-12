"use client"
import PrintInvoice from '@/components/PrintComponent/PrintInvoice';
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';

export default function page() {
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div>
        <h1>Trang chủ</h1>
        <PrintInvoice ref={componentRef} content="Đây là nội dung cần in." />
        <ReactToPrint
          trigger={() => <button>In</button>}
          content={() => componentRef.current}
        />
      </div>

    </div>
  )
}
