
import AddStatistic from '@/components/StatisticComponent/AddStatistic/AddStatistic'
import React from 'react'

export default function page() {
  return (
    <div className={`flex h-full lg:flex-row flex-wrap flex-col gap-4`}>
      <div className='mt-4 flex-auto'>
        <AddStatistic />
       
      </div>
    </div>
  )
}
