"use client"
import React, { useEffect, useState } from 'react'
import GetOrderData from './GetOrderData'
import { notFound } from 'next/navigation';
import EditOrder from '../EditOrder/EditOrder';

export default function OrderDetail(slug: any) {
    const [data, setData] = useState<any>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await GetOrderData(slug.slug);
                console.log("data", rs)
                setData(rs);
            } catch (error) {
                notFound();
                setData([]);
            }
        }
        fetchData();
        setLoading(false);
    }, [slug])
    return (
        <div>
            {!loading && <EditOrder orderData={data} />}
        </div>
    )
}
