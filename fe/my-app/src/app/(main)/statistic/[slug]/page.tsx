import GetPattern from '@/ApiPattern/GetPattern'
import StatisticList from '@/components/StatisticComponent/StatisticList/StatisticList'
import React from 'react'

export default async function page() {
  let url = process.env.NEXT_PUBLIC_API_URL + '/api/home/getNbr'
  const response = await GetPattern(url,{});
  const totalleft : number = response[4].value;
  return (
    <StatisticList totalLeft={totalleft} />
  )
}
