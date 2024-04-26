import { Search } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    setOpenSearchWindow: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SearchComponents(props: Props) {
    const items = [
        { id: 1, name: "order", title: "BBNT và XNKL", placeHolder: "Nhập tên khách hàng hoặc mã biên bản" },
        { id: 2, name: "payment", title: "Công nợ", placeHolder: "Nhập tên khách hàng hoặc mã biên bản" },
        { id: 3, name: "statistic", title: "BBNT và GT", placeHolder: "Nhập tên " },
        { id: 4, name: "Customer", title: "Khách hàng", placeHolder: "Nhập tên khách hàng" },
        { id: 5, name: "Product", title: "Sản phẩm", placeHolder: "Nhập tên sản phẩm" }
    ]
    const [select, setSelect] = useState<any>(null);
    const handleInput = (value: string) => {

    }
    const handleSelect = (val: any) => {
        setSelect(items[val])
    }
    const handleSubmit = (e:any)=>{
        e.preventDefault()
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className="max-w-3xl h-4/5 w-full bg-white rounded-lg shadow-lg p-6 relative text-black">

            <div>
                <h2 className='text-gray-700 font-bold lg:text-2xl text-lg mb-2'>Tìm Kiếm {select ? select.title : ''}</h2>
                <p className='text-gray-400'>Lựa chọn loại tìm kiếm</p>
                <select
                    onChange={(e) => handleSelect(e.target.value)}
                    className="block appearance-none w-full bg-slate-300 border border-gray-400 hover:bg-slate-600' px-4 py-2 pr-8 rounded shadow leading-tight outline-none focus:shadow-outline"
                >
                    {!select && <option value="">Chọn một tùy chọn</option>}
                    {items.map((item, index) => (
                        <option value={index} key={item.id}>{item.title}</option>
                    ))}
                </select>
            </div>
            <div className="my-4 relative">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={`${!select ? 'cursor-not-allowed' : ''} w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder={select ? select.placeHolder : "Chọn loại tìm kiểm ở trên"}
                        disabled={!select ? true : false}
                        onChange={(e) => handleInput(e.target.value)}
                    />
                    <button type='submit' className="absolute right-0 bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        <Search /> Search
                    </button>
                </form>
            </div>
            {/* <div className='h-2/3 overflow-auto mb-3'>
            {loading ? <LoadingScene /> :
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th style={{ width: '10%' }}>ID</th>
                            <th>Tên Công Ty</th>
                            <th>Mã số Thuế</th>
                            <th>Người đại diện</th>
                            <th>Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cusItem.map((item: any) => (
                            <tr onClick={() => handleSetCus(item)} className="h-10 cursor-pointer hover:bg-gray-400 border-b border-gray-200" key={item.id}>
                                <td className='text-center'>{item.id}</td>
                                <td className='text-center'>{item.companyName}</td>
                                <td className='text-center'>{item.taxCode}</td>
                                <td className='text-center'>{item.representativeCustomer}</td>
                                <td className='text-center'>{item.positionCustomer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div> */}

        </div>
    )
}
