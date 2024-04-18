import StatisticDetails from '@/components/StatisticComponent/StatisticDetails/StatisticDetails'
import React from 'react'

export default function page({params}:{params:{slug:string}}) {
    return (
    <StatisticDetails param={params.slug}/>
  )
}
