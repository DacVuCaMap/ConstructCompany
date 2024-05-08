'use client'
import AddStatistic from '@/components/StatisticComponent/AddStatistic/AddStatistic'
import React from 'react'

export default function page() {
  return (
    <div>
      <AddStatistic order={undefined} endDay={new Date()} startDay={new Date()} />
    </div>
  )
}
