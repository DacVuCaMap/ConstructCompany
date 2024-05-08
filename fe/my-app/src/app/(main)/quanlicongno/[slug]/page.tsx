import GetPattern from '@/ApiPattern/GetPattern';
import QuanLiCNList from '@/components/QuanLiCongNoComponents/QuanLiCNList';
import { Plus } from 'lucide-react';
import React from 'react'

export default async function page() {
    let url = process.env.NEXT_PUBLIC_API_URL + '/api/home/getNbr'
    const response = await GetPattern(url, {});
    const totalleft: number = response[4].value;
    return (
        <div>
            <h2 className='text-gray-700 font-bold lg:text-3xl text-lg mb-4'>Quản Lí Công Nợ</h2>
            <QuanLiCNList totalLeft={totalleft} />
        </div>

    )
}
