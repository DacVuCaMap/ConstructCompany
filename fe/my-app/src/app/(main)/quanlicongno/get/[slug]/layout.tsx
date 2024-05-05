
import GetPattern from '@/ApiPattern/GetPattern';
import QuanLiCNDetail from '@/components/QuanLiCongNoComponents/QuanLiCNDetail';
import React from 'react'

export default async function layout({ children, params }: Readonly<{ children: React.ReactNode; params: any }>) {
    //get customer
    let url = process.env.NEXT_PUBLIC_API_URL + `/api/customers/get-details/${params.slug}`
    const customer = await GetPattern(url, {});
    console.log(customer);
    return (
        <div>
            <div className='p-4'>
                <QuanLiCNDetail data={customer} />
            </div>
            <div className='p-4'>
                <div className='p-4 bg-white'>
                    {children}
                </div>
            </div>

        </div>
    )
}
