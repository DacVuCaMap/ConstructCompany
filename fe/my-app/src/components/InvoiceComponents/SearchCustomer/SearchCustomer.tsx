"use client"
import React from 'react'

export default function SearchCustomer() {
    const handleCancel = ()=>{
        console.log("out")
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative">
                <button className="absolute top-0 right-0 m-3 text-gray-600" onClick={() => handleCancel()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>
                {/* Hiển thị kết quả tìm kiếm ở đây */}
            </div>
        </div>
    )
}
