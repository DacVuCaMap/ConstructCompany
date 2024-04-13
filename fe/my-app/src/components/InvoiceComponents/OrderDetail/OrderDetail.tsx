"use client"
import React, { useEffect, useState } from 'react'
import GetOrderData from './GetOrderData'
import { notFound } from 'next/navigation';
import EditOrder from '../EditOrder/EditOrder';

export default function OrderDetail(slug: any) {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [err,setErr] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await GetOrderData(slug.slug);
                console.log("data", rs)
                setData(rs);
                if (!rs.order) {
                    setErr(true);
                }
            } catch (error) {
                setData([]);
            }
        }
        fetchData();
        setLoading(false);
    }, [slug])
    if (err) {
        notFound();
    }
    return (
        <div>
            {!loading && !err ? <EditOrder orderData={data} /> : ''}
        </div>
    )
}
