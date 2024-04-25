
import ConfigSellerComponent from '@/components/ConfigSellerComponent';
import { sellerData } from '@/data/data';
import React from 'react'

export default function page() {
    const data :any = sellerData;
    return (
        <ConfigSellerComponent data={data}/>
    )
}
