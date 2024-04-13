"use client"
import { KeyRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="h-10 w-full bg-white flex items-center justify-end px-4">
      <div className="flex items-center">
        <Link href={'/login'} className="text-gray-800 ml-2 border-b border-transparent hover:border-gray-800">Login</Link>
        <Image src="/assets/image/adminimg.png" width={50} height={50} alt="Avatar" className="w-8 ml-4 h-8 rounded-full" />

      </div>
    </div>
  )
}
