"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { userData } from '@/data/authenticate'
type Props = {
  userMail:any,
  isAdminRole:any
}
export default function Header(props:Props) {
  return (
    <div className="h-10 w-full bg-white flex items-center justify-end px-4">
      <div className="flex items-center">
        {props.userMail ? (
          <><span className="bg-slate-900 px-10 rounded text-lg text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700">
            {props.userMail}
          </span>

            {props.isAdminRole === "true" &&
              <div className="bg-slate-900 px-5 rounded text-lg text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                ADMIN
              </div>
            }</>

        ) : (
          <Link
            href={'/login'}
            className="bg-slate-900 px-10 rounded text-lg text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700"
          >
            Login
          </Link>
        )}
        <Image
          src="/assets/image/adminimg.png"
          width={50}
          height={50}
          alt="Avatar"
          className="w-8 ml-4 h-8 rounded-full"
        />
      </div>
    </div>
  )
}