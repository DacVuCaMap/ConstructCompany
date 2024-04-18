'use server'
import GetPattern from '@/ApiPattern/GetPattern'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function StatisticDetailsData(id:string) {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL+'/api/statistic/details/'+id;
        const response = await GetPattern(url, {})
        return response;
    } catch (error) {
        notFound();
        return null;
    }
}
