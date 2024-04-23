
import OrderDetail from '@/components/InvoiceComponents/OrderDetail/OrderDetail'
import React from 'react'

export default function page({ params }: { params: { slugGet: any } }) {
    
  return (
    <div>
      <OrderDetail slug={params.slugGet}/>
    </div>
  )
}
