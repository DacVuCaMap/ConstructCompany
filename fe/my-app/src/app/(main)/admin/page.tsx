import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      Admin page
      <Link href={'/admin/admin-con'}>Admin con</Link>
    </div>
  )
}
