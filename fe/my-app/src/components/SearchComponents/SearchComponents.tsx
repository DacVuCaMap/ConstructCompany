import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import LoadingScene from '../LoadingScene';
import GetPattern from '@/ApiPattern/GetPattern';

type Props = {
    setOpenSearchWindow: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SearchComponents(props: Props) {
    const route = useRouter();
    const [loading, setLoading] = useState(false);
    const [cusItem, setCusItem] = useState<any[]>([]);
    const [showBox, setShowBox] = useState(true);
    const items = [
        { id: 1, name: "order", title: "BBNT và XNKL", placeHolder: "Nhập tên khách hàng hoặc mã biên bản", linkApi: "/invoice/list?page=0&size=10&search=" },
        { id: 2, name: "payment", title: "Công nợ", placeHolder: "Nhập tên khách hàng hoặc mã biên bản", linkApi: "/payment/list?page=0&size=10&search=" },
        { id: 3, name: "statistic", title: "BBNT và GT", placeHolder: "Nhập tên khách hàng", linkApi: "/statistic/get?page=0&size=10&search=" },
        { id: 4, name: "Customer", title: "Khách hàng", placeHolder: "Nhập tên khách hàng hoặc mã số thuế", linkApi: "/customer/get?page=0&size=10&search=" },
        { id: 5, name: "Product", title: "Sản phẩm", placeHolder: "Nhập tên sản phẩm", linkApi: "/product/search?page=0&size=10&search=" }
    ]
    const [wordsKey, setWordsKey] = useState('');
    const [select, setSelect] = useState<any>(null);
    const [proBox, setProBox] = useState(false);
    const handleSelect = (val: any) => {
        setSelect(items[val])
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        // route.push(select.linkApi+wordsKey);
        window.location.href = select.linkApi + wordsKey;
        props.setOpenSearchWindow(false);
    }
    const handlePost = async (e: any) => {
        setWordsKey(e);
        console.log(select.name)
        if (select.name==="Product") {
            setProBox(true);
            setShowBox(false);
        }
        else{
            setShowBox(true);
            setProBox(false);
        }
        console.log(proBox,showBox)
        setLoading(true);
        let url = process.env.NEXT_PUBLIC_API_URL + "/api/customers/get?size=10&page=0&search="
        url = select.name === 'Product' ? process.env.NEXT_PUBLIC_API_URL + "/api/product/search?page=0&size=10&name=" : url;
        const response = await GetPattern(url + e, {})
        if (response == null) {
            return;
        }
        setLoading(false);
        if (select.name === 'Product') {
            setCusItem(response.productPage.content)
            return;
        }
        setCusItem(response.customerPage.content);


    }
    return (
        <div onClick={(e) => e.stopPropagation()} className="max-w-3xl h-4/5 lg:w-full w-11/12 bg-white rounded-lg shadow-lg p-6 relative text-black overflow-auto">

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

                    <div onClick={(e) => e.stopPropagation()} className="max-w-3xl h-4/5 w-full bg-white rounded-lg shadow-lg p-6 relative">
                        <p className='text-gray-400'>Nhập từ khóa</p>
                        <div className='relative'>
                            <input
                                type="text"
                                className={`${!select ? 'cursor-not-allowed' : ''} w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500`}
                                placeholder={select ? select.placeHolder : "Chọn loại tìm kiểm ở trên"}
                                disabled={!select ? true : false}
                                value={wordsKey}
                                onChange={(e) => handlePost(e.target.value)}
                            />
                            <button type='submit' className="absolute right-0 bg-blue-500 h-full hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                <Search /> Search
                            </button>
                        </div>
                        {showBox && <div className='h-2/3 overflow-auto mb-3'>
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
                                            <tr onClick={() => { setWordsKey(item.companyName); setShowBox(false) }} className="h-10 cursor-pointer hover:bg-gray-400 border-b border-gray-200" key={item.id}>
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
                        </div>}

                        {proBox && <div className='h-2/3 overflow-auto mb-3'>
                            {loading ? <LoadingScene /> :
                                <table className='w-full'>
                                    <thead>
                                        <tr className='bg-gray-200'>
                                            <th style={{ width: '10%' }}>ID</th>
                                            <th>Tên Sản Phẩm</th>
                                            <th>Tồn kho</th>
                                            <th>Giá nhập</th>
                                            <th>Giá bán</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {cusItem.map((item: any) => (
                                            <tr onClick={() => { setWordsKey(item.proName); setProBox(false) }} className="h-10 cursor-pointer hover:bg-gray-400 border-b border-gray-200" key={item.id}>
                                                <td className='text-center'>{item.id}</td>
                                                <td className='text-center'>{item.proName}</td>
                                                <td className='text-center'>{item.inventory}</td>
                                                <td className='text-center'>{item.importPrice}</td>
                                                <td className='text-center'>{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </div>}

                    </div>
                </form>
            </div>
        </div>
    )
}
