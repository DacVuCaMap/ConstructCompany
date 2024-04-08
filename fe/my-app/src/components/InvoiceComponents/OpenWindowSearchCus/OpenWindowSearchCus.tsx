
import GetPattern from '@/ApiPattern/GetPattern';
import React, { useState } from 'react'

type Props ={
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
    

export default function OpenWindowSearchCus(props:Props) {
    document.body.style.overflow='hidden';
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/customers/get?size=10&page=0&search="
    const [cusItem,setCusItem] = useState([]);
    const handleCancel = ()=>{
        document.body.style.overflow='unset';
        props.setOpen(false);
    }
    const handlePost=async (e:string)=>{
        console.log(e)
        const response = await GetPattern(url+e,{})
        if (response==null) {
            return;
        }
        console.log(response);
    }
  return (
    <div onClick={handleCancel}  className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
            <div onClick={(e) => e.stopPropagation()} className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative">
                <button className="absolute top-0 right-0 m-3 text-gray-600" onClick={() => handleCancel()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="mb-4">
                    <h2 className='block text-gray-700 font-bold mb-2'>Đại diện bên mua</h2>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Nhập tên công ty hoặc mã số thuế"
                        onChange={(e)=>handlePost(e.target.value)}
                    />
                </div>
                {/* Hiển thị kết quả tìm kiếm ở đây */}
            </div>
        </div>
  )
}
