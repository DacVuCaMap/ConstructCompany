"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import "./Header.css"
import { userData } from '@/data/authenticate'
import { Menu, Search } from 'lucide-react'
import SideBar from '../SideBar/SideBar'
import SearchComponents from '../SearchComponents/SearchComponents'
type Props = {
  userMail: any,
  isAdminRole: any
}
export default function Header(props: Props) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  // console.log(sideBarOpen);
  const [openSearchWindow, setOpenSearchWindow] = useState(false);
  return (
    <div className="h-10 w-full bg-white flex items-center justify-between pr-4 ">
      {openSearchWindow && <div onClick={() => setOpenSearchWindow(!openSearchWindow)} className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
        <SearchComponents setOpenSearchWindow={setOpenSearchWindow} />
      </div>}
      <div className={`lg:hidden fixed top-0 barHead z-30 ${sideBarOpen ? 'slideInLeft-animation' : ''}`}>
        <SideBar userMail={props.userMail} />
      </div>
      <div className='h-full flex items-center'>
        <button onClick={() => setSideBarOpen(!sideBarOpen)} className='bg-slate-900 h-full hover:bg-slate-500 shadow-md px-4 lg:hidden'>
          <Menu className='h-full text-white' />
        </button>
        <div className='bg-slate-500 lg:ml-4 ml-2 h-8 w-36 lg:w-48 rounded overflow-hidden hover:bg-slate-600'>
          <button onClick={() => setOpenSearchWindow(!openSearchWindow)} className=' flex h-full w-full items-center px-4'>
            <Search className='text-slate-300' />
            <h2 className='ml-2 text-slate-300'>Tìm kiếm..</h2>
          </button>
        </div>
      </div>
      {sideBarOpen && <div onClick={() => setSideBarOpen(false)} className='lg:hidden fixed top-0 z-20 bg-black opacity-50 h-screen w-screen '>
      </div>}
      <div className="flex items-center">
        {props.userMail ? (
          <><span className="bg-slate-900 max-w-48 px-4 overflow-hidden truncate rounded h-8 text-sm text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
            <p className='truncate'>{props.userMail}</p>
          </span>

            {props.isAdminRole === "true" ?
              <div className="bg-slate-900 px-5 rounded h-8 text-sm text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span>ADMIN</span>
              </div> : <div className="bg-slate-900 h-8 px-5 rounded text-sm text-gray-400 ml-2 border-b border-transparent hover:bg-gray-700 flex items-center">
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