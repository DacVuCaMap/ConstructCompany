
import GetPattern from '@/ApiPattern/GetPattern';
import GetSeller from '@/ApiPattern/GetSeller';
import ConfigSellerComponent from '@/components/ConfigSellerComponent';
import getData from '@/components/List/getData';
import React from 'react'

export default async function page() {
    const data =await GetSeller();
    console.log("data", data)
    return (
        <ConfigSellerComponent data={data} />
    )
}
