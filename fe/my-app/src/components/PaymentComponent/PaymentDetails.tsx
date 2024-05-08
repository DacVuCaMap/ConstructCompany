"use client"
import React, { useEffect, useState } from 'react'
import LoadingScene from '../LoadingScene';
import Link from 'next/link';
import './PaymentDetails.css'
import PrintPayment from '../PrintComponent/PrintPayment';
import { CircleCheck, ClipboardMinus } from 'lucide-react';
import PostPattern from '../../../public/ApiPattern/PostPattern';
import postData from '@/ApiPattern/PostPattern';
import { convertDay, formatNumberWithDot, numberWithoutDots } from '@/data/listData';
import { useRouter } from 'next/navigation';
import PrintQLCN from '../PrintComponent/PrintQLCN';
import { MoonLoader } from 'react-spinners';
type Props = {
  data: any
}
type Payment = { statisticId: any, price: number, description: string, day: Date, itemId: any, id: any }
export default function PaymentDetails(props: Props) {
  console.log(props.data);
  const [statistic, setStatistic] = useState<any>();
  const [items, setItems] = useState<Payment[]>([]);
  const [openPDF, setOpenPDF] = useState(false);
  const [openPDFDCCN, setOpenPDFDCCN] = useState(false);
  const [error, setError] = useState('');
  const [success,setSuccess] = useState(false);
  const [loading,setLoading] = useState(false);
  const route = useRouter();
  useEffect(() => {
    if (props.data) {
      setStatistic(props.data.statistic);
      let count = 0;
      const formattedItems: Payment[] = props.data.payments.map((item: any, index: number) => ({
        statisticId: props.data.statistic.id,
        price: item.price,
        description: item.description,
        day: item.day,
        itemId: index,
        id: item.id
      }))
      setItems(formattedItems);
    }
  }, [props])
  if (!statistic) {
    return (
      <div>
        <LoadingScene />
      </div>
    )
  }
  const handleAddRow = () => {
    let lastId = 0;
    if (items[items.length - 1]) {
      lastId = items[items.length - 1].itemId + 1
    }
    const newItem: Payment = {
      statisticId: statistic.id,
      price: 0,
      description: `${statistic.customer.companyName} chuyển tiền thanh toán`,
      day: new Date(),
      itemId: lastId,
      id: null
    }
    setItems([...items, newItem]);
  }
  const formatNumber = (number: any) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return 0;
  }
  const handleInputChange = (e: any, itemId: any, key: any) => {
    let { value } = e.target;
    // console.log(value)
    if (key === 'price') {
      let flag = false;
      // console.log(!value)
      if (!value) {
        flag = true;
        value = 0;
      }
      if (value != 0) {
        value = numberWithoutDots(value);
      }
      // console.log(value)
      if (!value && !flag) {
        return;
      }
    }
    if (key === 'day') {
      value = new Date(value);

    }
    const updatedItems = items.map((item: Payment) =>
      item.itemId === itemId ? { ...item, [key]: value } : item
    );
    setItems(updatedItems);
  }
  const handleClickPrice = (itemId: any) => {
    const e = { target: { value: calLeftAmount() + "" } };
    handleInputChange(e, itemId, 'price');
  }
  const handleDelRow = (itemId: any) => {
    const updatedItems = items.filter(item => item.itemId !== itemId);
    setItems(updatedItems);
  }
  const closePDFView = () => {
    setOpenPDF(false);
    setOpenPDFDCCN(false);
    document.body.style.overflow = 'unset';
  }
  const calLeftAmount = () => {
    let cal = statistic.cashLeft - statistic.totalAmount;
    let tot = items.reduce((total, item) => {
      return total + item.price;
    }, cal)
    
    // console.log(tot);
    return tot;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (calLeftAmount() < 0) {
      setError("Tiền thanh toán còn lại âm")
      return;
    }
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/payment/add'
    const dataToPost = { payments: [...items], statisticId: statistic.id }
    console.log(dataToPost);
    const response = await postData(url, dataToPost, {});
    console.log(response)
    setLoading(false);
    setSuccess(true)
    if (response.data && response.data.status != 200) {
      setError(response.data.message);
      return;
    }
    // route.push('/payment/list?size=10&page=0')
  }
  const sumPay = () => {
    let tot = items.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return tot;
  }
  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full lg:max-w-5xl  "
        onSubmit={handleSubmit}
      >
        <h2 className='block text-3xl text-gray-900 font-bold mb-4 border-b'>Biên Bản Đối Chiếu Công nợ</h2>
        {error && <span className='bg-red-500 text-white border border-red-700 rounded px-4 py-2'>{error}</span>}
        <div className='mb-8 mt-4 border-b'>
          <div className='broder-b'>
            <h2 className='text-2xl font-bold text-gray-700  inline-block'>Khách Hàng</h2>
          </div>
          <Link className='underline text-blue-500' href={`/invoice/get/${statistic.order.id}`}>Mã Biên Bản: {statistic.order.contractCode} (nhấn vào đây để xem chi tiết BBNT và XNKL)</Link>
          <div>
            Tên Công ty: <span className='font-bold'>{statistic.customer.companyName}</span>
          </div>
          <div>
            <span className='mr-20'>Người đại diện: <span className='font-bold'>{statistic.customer.representativeCustomer}</span></span>
            <span>Vị trí: <span className='font-bold'>{statistic.customer.positionCustomer}</span></span>
          </div>
          <span>Tổng thành tiền BBNT và XNKL: <span className='font-bold'>{formatNumberWithDot(statistic.order.totalAmount,2)} vnđ</span></span>
        </div>
        <div>
          <span className='font-bold underline text-gray-700 text-1xl'>I. Số dư đầu kì: {formatNumberWithDot(statistic.cashLeft,2)} </span>
          <table border={1} className='w-full table-auto text-sm mb-10 mt-2'>
            <thead className='bg-neutral-900 h-10 text-white'>
              <tr>
                <th>STT</th>
                <th>Ngày thanh toán</th>
                <th className=''>Nội Dung</th>
                <th className='text-left w-24'>Tiền Thanh Toán</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='border-b border-gray-500'>
              {items.map((item: Payment, index) => (
                <tr key={index} className={`h-7 ${index % 2 === 0 ? 'bg-white' : 'bg-stone-200'}`}>
                  <td className='text-center px-4'>{index + 1} </td>
                  <td><input
                    type="Date"
                    className='h-7'
                    value={new Date(item.day).toISOString().substring(0, 10)}
                    onChange={(e) => handleInputChange(e, item.itemId, 'day')}
                  /></td>
                  <td>
                    <input
                      className='h-7 w-full px-4 truncate'
                      value={item.description}
                      onChange={(e) => handleInputChange(e, item.itemId, 'description')}
                    />
                  </td>
                  <td>
                    <div className='flex'>
                      <input
                        required
                        className='h-10 w-20 lg:w-32'
                        placeholder='Nhập đơn giá'
                        type="text"
                        value={item.price === 0 ? '' : formatNumber(item.price)}
                        onChange={(e) => handleInputChange(e, item.itemId, 'price')} />
                      <button type='button' className='text-center w-20 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleClickPrice(item.itemId)}>Còn lại</button>
                    </div>

                  </td>
                  <td className='text-center '>
                    <button type='button' className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelRow(item.itemId)}>xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className='text-center'>
                  <button type='button' className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddRow}>+ Thêm thanh toán</button>
                </td>
                <td>
                  <span className='font-bold text-gray-700'>II. Tổng số tiền đã thanh toán trong kỳ</span>
                </td>
                <td><span>{ formatNumber(sumPay()) }</span></td>
              </tr>
              <tr className='border h-10  bg-gray-300'>
                <td colSpan={3} >
                  <h2 className='text-gray-800 font-bold text-center  border-r border-gray-700'>III. Phát sinh trong kỳ: từ ngày {convertDay(statistic.startDay)} đến ngày {convertDay(statistic.endDay)}</h2>
                </td>
                <td>
                  <span className='font-bold text-gray-800 text-1xl'>{formatNumberWithDot(statistic.totalAmount, 2)}</span>
                </td>
                <td className='text-center'>
                  <Link className='text-blue-600 underline' href={"/statistic/get/" + statistic.id} target='_blank'>Link Chi tiết</Link>
                </td>
              </tr>
              <tr className='border h-10  bg-gray-300'>
                <td colSpan={3} >
                  <h2 className='text-gray-800 font-bold text-center  border-r border-gray-700'>IV. Đối trừ công nợ ( IV = I + II - III )</h2>
                </td>
                <td>
                  <span className='font-bold text-gray-800 text-1xl'>{formatNumberWithDot(calLeftAmount(), 2)}</span>
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        {success && <span className='text-green-500 flex flex-row space-x-1'> <CircleCheck /> <p>Lưu thành công</p></span>}
        <div className='flex'>
          <button
            className="bg-blue-500 h-10 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? <MoonLoader color="rgba(0, 0, 0, 1)" size={20}/> : 'Lưu Dữ Liệu'}

          </button>

          {/* <button
            className=" hover:text-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setOpenPDF(true)}
            type='button'
          >
            <div className='flex'>
              <ClipboardMinus /> Xem Trước ĐNTT
            </div>
          </button> */}
          <button
            className=" hover:text-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setOpenPDFDCCN(true)}
            type='button'
          >
            <div className='flex'>
              <ClipboardMinus /> Xem Trước ĐCCN
            </div>
          </button>
        </div>
      </form>

      {/* {openPDF && <div onClick={() => closePDFView()} className="fixed overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center ">
        <div className='mt-20'>
          <PrintPayment data={statistic.order} />
        </div>
      </div>} */}
      {openPDFDCCN && <div onClick={() => closePDFView()} className="fixed overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center ">
        <div className='mt-20'>
          <PrintQLCN data={statistic} payments={props.data.payments} />
        </div>
      </div>}
    </div>
  )
}
