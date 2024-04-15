import GetPattern from '@/ApiPattern/GetPattern';
import postData from '@/ApiPattern/PostPattern';
import LoadingScene from '@/components/LoadingScene';
import { formatNumberToDot } from '@/data/listData';
import React, { useEffect, useState } from 'react'
type Pro = { productId: string, proName: string, itemId: number, unit: string, price: number }
type Props = {
    setOpenWindowPro: React.Dispatch<React.SetStateAction<boolean>>,
    handleInputProduct: (item: any) => boolean
}
export default function OpenWindowStatisticPro(props: Props) {
    document.body.style.overflow = 'hidden';

    const [listPro, setListPro] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorExists,setErrorExists] = useState(false);
    let url = process.env.NEXT_PUBLIC_API_URL + "/api/product/search?size=10&page=0&name="
    // first loading
    useEffect(() => {
        const fetch = async (str: string) => {
            try {
                const response = await GetPattern(url + str, {})
                if (response == null) {
                    return;
                }
                setListPro(response.productPage.content);
            } catch (error) {
                setListPro([]);
            }
        }
        fetch('');
        setLoading(false);
    }, [])
    const handleInputSearchPro = async (str: string) => {
        setLoading(true);
        setErrorExists(false);
        try {
            const response = await GetPattern(url + str, {})
            if (response == null) {
                return;
            }
            setLoading(false);
            setListPro(response.productPage.content);
        } catch (error) {
            setListPro([]);
        }
        
    }
    const handleSetPro = (item: any) => {
        const check = props.handleInputProduct(item);
        if (check) {
            setErrorExists(true);
            return;
        }
        handleCancel();
    }
    const handleCancel = () => {
        document.body.style.overflow = 'unset';
        props.setOpenWindowPro(false);
    }
    return (
        <div onClick={handleCancel} className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
            <div onClick={(e) => e.stopPropagation()} className="max-w-3xl h-4/5 w-full bg-white rounded-lg shadow-lg p-6 relative">
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
                        onChange={(e) => handleInputSearchPro(e.target.value)}
                    />
                </div>
                <div className='h-2/3 overflow-auto mb-3'>
                    {loading ? <LoadingScene /> :
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th style={{ width: '10%' }}>ID</th>
                                    <th>Tên Vật liệu</th>
                                    <th>Đơn vị</th>
                                    <th>Tồn kho</th>
                                    <th>Giá bán</th>
                                    <th>Giá Nhập</th>
                                </tr>
                            </thead>
                            <tbody>

                                {listPro.map((item: any,indexPro) => (
                                    <tr onClick={() => handleSetPro(item)} className={`h-10 cursor-pointer hover:bg-gray-400 border-b border-gray-200`} key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.proName}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.inventory}</td>
                                        <td>{formatNumberToDot(item.price)}</td>
                                        <td>{formatNumberToDot(item.importPrice)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    {errorExists && <p className="text-red-500 italic text-lg">Đã tồn tại</p>}
                </div>

            </div>
        </div>
    )
}
