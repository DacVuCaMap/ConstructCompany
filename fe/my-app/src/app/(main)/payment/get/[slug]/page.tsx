
import GetPattern from '@/ApiPattern/GetPattern';
import PaymentDetails from '@/components/PaymentComponent/PaymentDetails';
import { notFound } from 'next/navigation';
import React from 'react'
const getDataPayment = async(id: string) => {
  let url = process.env.NEXT_PUBLIC_API_URL + "/api/payment/get/"+id;
  const response = await GetPattern(url,{});
  return response;
}

export default async function page({ params }: { params: { slug: string } }) {
  const data = await getDataPayment(params.slug);
  if (!data) {
    return notFound();
  }
  return (
    <PaymentDetails data={data}/>
  )
}
