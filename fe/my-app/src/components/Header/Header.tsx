"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import "./Header.css"
import { userData } from '@/data/authenticate'
import { Menu } from 'lucide-react'
import SideBar from '../SideBar/SideBar'
type Props = {
  userMail: any,
  isAdminRole: any
}
export default function Header(props: Props) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  console.log(sideBarOpen);
  return (
    <div className="h-10 w-full bg-white flex items-center justify-between pr-4 ">
      <div className={`lg:hidden fixed top-0 barHead z-30 ${sideBarOpen ? 'slideInLeft-animation' : ''}`}>
        <SideBar userMail={props.userMail} />
      </div>
      <div className='h-full flex'>
        <button onClick={() => setSideBarOpen(!sideBarOpen)} className='bg-slate-900 hover:bg-slate-500 shadow-md px-4 lg:hidden'>
          <Menu className='h-full text-white' />
        </button>
      </div>
      {sideBarOpen && <div onClick={()=>setSideBarOpen(false)} className='lg:hidden fixed top-0 z-20 bg-black opacity-50 h-screen w-screen '>
      </div>}
      <div className="flex items-center">
        {props.userMail ? (
          <><span className="bg-slate-900 px-10 rounded h-8 text-sm text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
            {props.userMail}
          </span>

            {props.isAdminRole === "true" ?
              <div className="bg-slate-900 px-5 rounded h-8 text-sm text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span>ADMIN</span>
              </div> :<div className="bg-slate-900 h-8 px-5 rounded text-sm text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 "></span>
                <span>Nhân viên</span>
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