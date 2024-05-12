import GetPattern from '@/ApiPattern/GetPattern';
import React, { useEffect, useState } from 'react'
import LoadingScene from '../LoadingScene';
import { convertDay, formatNumberWithDot, numberWithoutDots } from '@/data/listData';
import AddStatistic from '../StatisticComponent/AddStatistic/AddStatistic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import postData from '@/ApiPattern/PostPattern';
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    data: any
}
export default function ShowListStatistic(props: Props) {
    const route = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openAddKy, setAddKy] = useState(false);
    const [openAddPay, setAddPay] = useState(false);
    const [offTabs, setOffTabs] = useState(true);
    const [dataKyAdd, setDataKyAdd] = useState<any>();
    const [formKyAdd, setFormKyAdd] = useState(false);
    const [errorNof, setNof] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [paymentAddData, setPaymentAddData] = useState<any>({
        price: 0
        , day: new Date(), description: `${props.data.customer.companyName} chuyển tiền thanh toán`
    })
    useEffect(() => {
        let url = process.env.NEXT_PUBLIC_API_URL + "/api/statistic/listbyorder?id=" + props.data.id;
        const fetch = async () => {
            try {
                const response = await GetPattern(url, {});
                setItems(response);
            } catch (error) {
                setItems([]);
                console.log(error)
            }
        }
        fetch();
        setLoading(false);
    }, [offTabs])
    const handleSetKyAdd = () => {
        // console.log(dataKyAdd);
        if (!dataKyAdd || !dataKyAdd.startDay || !dataKyAdd.endDay) {
            setNof("Không để trống")
            return;
        }
        if (dataKyAdd.startDay > dataKyAdd.endDay) {
            setNof("ngày bắt đầu sau ngày kết thúc")
            return;
        }
        if (!checkKyDay(dataKyAdd.startDay) || !checkKyDay(dataKyAdd.endDay)) {
            setNof("Ngày bắt đầu hoặc kết thúc nằm trong các kỳ trước")
            return;
        }
        setAddKy(false);
        setFormKyAdd(true);
    }
    const checkKyDay = (day: Date) => {
        for (let item of items) {
            if (day >= new Date(item.startDay) && day <= new Date(item.endDay)) {
                return false;
            }
        }
        return true;
    }
    const handlePostPayment = async (e: any) => {
        e.preventDefault();
        // console.log(items)
        // console.log(props.data)
        // if (checkKyDay(paymentAddData.day)) {
        //     setNof("Ngày không nằm trong các kỳ")
        //     return;
        // }
        let url = process.env.NEXT_PUBLIC_API_URL + "/api/payment/addone"
        const dataPost = { orderId: props.data.id, price: price, day: paymentAddData.day, description: paymentAddData.description };
        const response = await postData(url,dataPost,{});
        console.log(dataPost);
        console.log(response); 
        setAddPay(false);
        setOffTabs(true);
    }
    const formatNumber = (number: any) => {
        if (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return 0;
    }
    const handleDelete=async (id : any)=>{
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/statistic/delete?id=` + id
        const response = await postData(url, {}, {});
        console.log(response)
        window.location.reload();
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='bg-white p-10 rounded-lg flex flex-col justify-center lg:w-3/4 w-full'>
            {!offTabs &&
                <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-51 '>
                    {/* {openAddKy &&
                        <div onClick={(e) => e.stopPropagation()} className='bg-white p-10 rounded-lg flex flex-col justify-center'>
                            <h2 className='text-gray-700 font-bold text-2xl border-b'>Khởi tạo</h2>
                            <p className='text-red-500'>{errorNof}</p>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold my-2"
                                >
                                    Từ Ngày:
                                </label><input
                                    className={`shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="s"
                                    type="date"
                                    placeholder='Từ ngày...'
                                    required
                                    onChange={(e) => setDataKyAdd({ ...dataKyAdd, startDay: new Date(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold my-2"
                                >
                                    Đến Ngày:
                                </label><input
                                    className={`shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="l"
                                    type="date"
                                    placeholder='Từ ngày...'
                                    required
                                    onChange={(e) => setDataKyAdd({ ...dataKyAdd, endDay: new Date(e.target.value) })}
                                />
                            </div>
                            <div className='space-x-2'>
                                <button onClick={handleSetKyAdd} className='mt-10 bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center'>Confirm</button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => { setOffTabs(true); setAddKy(false) }}
                                >
                                    Hủy
                                </button>
                            </div>

                        </div>
                    } */}
                    {formKyAdd && <AddStatistic order={props.data} endDay={new Date()} startDay={new Date()} />}
                    {openAddPay &&
                        <div onClick={(e) => e.stopPropagation()} className='bg-white p-10 rounded-lg flex flex-col justify-center'>
                            <h2 className='text-gray-700 font-bold text-2xl border-b'>Thêm Thanh Toán</h2>
                            <p className='text-red-500'>{errorNof}</p>
                            <form onSubmit={handlePostPayment}>
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold my-2"
                                    >
                                        Ngày
                                    </label><input
                                        className={`shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        id="ss"
                                        type="date"
                                        placeholder='Từ ngày...'
                                        required
                                        onChange={(e) => setPaymentAddData({ ...paymentAddData, day: new Date(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold my-2"
                                    >
                                        Số Tiền
                                    </label><input
                                        className={`shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        id="lbs"
                                        type="text"
                                        placeholder='Số tiền...'
                                        required
                                        value={price == 0 ? '' : formatNumber(price)}
                                        onChange={(e) => setPrice(numberWithoutDots(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold my-2"
                                    >
                                        Nội dung
                                    </label><input
                                        className={`shadow truncate appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        id="l"
                                        type="text"
                                        placeholder='Nội dung'
                                        value={paymentAddData.description}
                                        required
                                        onChange={(e) => setPaymentAddData({ ...items, description: e.target.value })}
                                    />
                                </div>
                                <div className='space-x-2'>
                                    <button type='submit' className='mt-10 bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded inline-flex items-center'>Confirm</button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => { setOffTabs(true); setAddPay(false) }}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>

                        </div>}

                </div>}
            <div>
                <h2 className='font-bold text-gray-700 text-2xl mb-4'>Danh sách Biên bản đối chiếu công nợ</h2>
                <div className='space-x-4'>
                    <button onClick={() => { setOffTabs(false); setFormKyAdd(true) }} type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>Thêm Kỳ</button>
                    <button onClick={() => { setOffTabs(false); setAddPay(true) }} type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>Thêm Thanh toán</button>
                </div>
                {loading ? <LoadingScene /> :
                    <div>
                        <table className='w-full'>
                            <thead className='border-b text-right'>
                                <tr>
                                    <th className='text-center'>Kỳ</th>
                                    <th className='text-center' >Từ ngày</th>
                                    <th className='text-center' >Đến ngày</th>
                                    <th className='text-center' >Chi phí phát sinh</th>
                                    <th className='text-center' >Dư đầu kỳ</th>
                                    <th className='text-center' >Link</th>
                                    <th className='text-center' >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: any, index) => (
                                    <tr onClick={() => { window.location.href="/payment/get/" + item.id }} key={index} className='text-center h-10 hover:cursor-pointer hover:bg-gray-300 border-b' >
                                        <td>{index + 1}</td>
                                        <td>{convertDay(item.startDay)}</td>
                                        <td>{convertDay(item.endDay)}</td>
                                        <td>{formatNumberWithDot(item.totalAmount, 2)}</td>
                                        <td>{formatNumberWithDot(item.cashLeft, 2)}</td>
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <div >
                                                <Link href={"/statistic/get/" + item.id} className='underline text-blue-500 hover:text-blue-700'>BBNTKL và GT</Link>
                                            </div>
                                        </td>
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <div className='flex flex-row justify-center space-x-1'>
                                                <span><Image onClick={()=>handleDelete(item.id)} src="/delete.svg" width={20} height={20} alt="" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {items.length<=0 &&
                                    <tr>
                                        <td colSpan={7}>
                                            <h2 className='text-center font-bold text-gray-700 py-10'> Không Có Kỳ Thanh Toán</h2>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                            <tfoot>
                                <tr className='font-bold'>
                                    <td></td>
                                    <td colSpan={3} className='text-center'>{props.data.leftAmount>0 ? 'Tổng tiền chưa thanh toán (tổng dư)' : "Tổng tiền chưa thanh toán (tổng dư)"}</td>
                                    <td className='text-center'>{formatNumberWithDot(props.data.leftAmount,2)}</td>
                                    <td colSpan={2}></td>

                                </tr>
                            </tfoot>
                        </table>
                    </div>}
            </div>
        </div>
    )
}
