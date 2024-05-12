import GetPattern from '@/ApiPattern/GetPattern';
import PaymentList from '@/components/PaymentComponent/PaymentList'
import React from 'react'

export default async function page({params}:any) {
    // console.log(params.slug)
    return <PaymentList slug={params.slug}/>
}
