'use server'
import GetPattern from '@/ApiPattern/GetPattern'
import React from 'react'

export default async function GetOrderData(slug:string) {
    const response = await GetPattern(process.env.NEXT_PUBLIC_API_URL+`/api/order/details/`+slug,{})
    return response;
}
