import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    setOpenSearchWindow: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SearchComponents(props: Props) {
    const route = useRouter();
    const items = [
        { id: 1, name: "order", title: "BBNT và XNKL", placeHolder: "Nhập tên khách hàng hoặc mã biên bản", linkApi: "/invoice/list?page=0&size=10&search=" },
        { id: 2, name: "payment", title: "Công nợ", placeHolder: "Nhập tên khách hàng hoặc mã biên bản", linkApi: "/payment/list?page=0&size=10&search=" },
        { id: 3, name: "statistic", title: "BBNT và GT", placeHolder: "Nhập tên khách hàng", linkApi: "/statistic/get?page=0&size=10&search=" },
        { id: 4, name: "Customer", title: "Khách hàng", placeHolder: "Nhập tên khách hàng hoặc mã số thuế", linkApi: "/customer/get?page=0&size=10&search=" },
        { id: 5, name: "Product", title: "Sản phẩm", placeHolder: "Nhập tên sản phẩm", linkApi: "/product/search?page=0&size=10&search=" }
    ]
    const [wordsKey, setWordsKey] = useState('');
    const [select, setSelect] = useState<any>(null);
    const handleInput = (value: string) => {
        setWordsKey(value);
    }
    const handleSelect = (val: any) => {
        setSelect(items[val])
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        // route.push(select.linkApi+wordsKey);
        window.location.href=select.linkApi+wordsKey;
        props.setOpenSearchWindow(false);
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className="max-w-3xl h-4/5 lg:w-full w-11/12 bg-white rounded-lg shadow-lg p-6 relative text-black">

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
            <div className={`my-4 ${select ? 'block' : 'hidden'}`}>
                <form onSubmit={handleSubmit}>
                    <p className='text-gray-400'>Nhập từ khóa</p>
                    <div className='relative'>
                        <input
                            type="text"
                            className={`${!select ? 'cursor-not-allowed' : ''} w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500`}
                            placeholder={select ? select.placeHolder : "Chọn loại tìm kiểm ở trên"}
                            disabled={!select ? true : false}
                            onChange={(e) => handleInput(e.target.value)}
                        />
                        <button type='submit' className="absolute right-0 bg-blue-500 h-full hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            <Search /> Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
