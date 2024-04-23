"use client"
import React, { useEffect, useState } from 'react'
import LoadingScene from '../LoadingScene';
import Link from 'next/link';
import './PaymentDetails.css'
import PrintPayment from '../PrintComponent/PrintPayment';
import { ClipboardMinus } from 'lucide-react';
import PostPattern from '../../../public/ApiPattern/PostPattern';
import postData from '@/ApiPattern/PostPattern';
import { numberWithoutDots } from '@/data/listData';
import { useRouter } from 'next/navigation';
type Props = {
  data: any
}
type Payment = { orderId: any, price: number, day: Date, itemId: any, id: any }
export default function PaymentDetails(props: Props) {
  const [order, setOrder] = useState<any>();
  const [items, setItems] = useState<Payment[]>([]);
  const [openPDF, setOpenPDF] = useState(false);
  const [error, setError] = useState('');
  const route = useRouter();
  useEffect(() => {
    if (props.data) {
      setOrder(props.data.order);
      let count = 0;
      const formattedItems: Payment[] = props.data.payments.map((item: any, index: number) => ({
        orderId: props.data.order.id,
        price: item.price,
        day: item.day,
        itemId: index,
        id: item.id
      }))
      setItems(formattedItems);
    }
  }, [props])
  if (!order) {
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
      orderId: order.id,
      price: 0,
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
    document.body.style.overflow = 'unset';
  }
  const calLeftAmount = () => {
    let cal = order.totalAmount;
    let tot = items.reduce((total, item) => {
      return total - item.price;
    }, cal)
    // console.log(tot);
    return tot;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    if (calLeftAmount() < 0) {
      setError("Tiền thanh toán còn lại âm")
      return;
    }
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/payment/add'
    const dataToPost = { payments: [...items], orderId: order.id }
    console.log(dataToPost);
    const response = await postData(url, dataToPost, {});
    console.log(response)
    if (response.data && response.data.status != 200) {
      setError(response.data.message);
      return;
    }
    // route.push('/payment/list?size=10&page=0')
    window.location.href='/payment/list?size=10&page=0'
  }
  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full lg:max-w-5xl  "
        onSubmit={handleSubmit}
      >
        <h2 className='block text-3xl text-gray-900 font-bold mb-4'>Công nợ</h2>
        {error && <span className='bg-red-500 text-white border border-red-700 rounded px-4 py-2'>{error}</span>}
        <div className='mb-8 mt-4'>
          <Link className='underline text-blue-500' href={`/invoice/get/${order.id}`}>CODE Biên Bản: {order.orderCode} (nhấn vào đây để xem chi tiết biên bản)</Link>
          <div>
            Tên Công ty: <span className='font-bold'>{order.customer.companyName}</span>
          </div>
          <div>
            <span className='mr-20'>Người đại diện: <span className='font-bold'>{order.customer.representativeCustomer}</span></span>
            <span>Vị trí: <span className='font-bold'>{order.customer.positionCustomer}</span></span>
          </div>
          <span>Tổng thành tiền: <span className='font-bold'>{formatNumber(order.totalAmount)} vnđ</span></span>
        </div>
        <div>
          <span>Tiền thanh toán còn lại: <span className='font-bold'>{formatNumber(calLeftAmount())}</span> </span>
          <table border={1} className='w-full table-auto text-sm mb-10'>
            <thead className='bg-neutral-900 h-10 text-white'>
              <tr>
                <th>STT</th>
                <th>Tiền Thanh Toán</th>
                <th>Ngày thanh toán</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='border-b border-gray-500'>
              {items.map((item: Payment, index) => (
                <tr key={index} className={`h-7 ${index % 2 === 0 ? 'bg-white' : 'bg-stone-200'}`}>
                  <td className='text-center'>{index + 1}</td>
                  <td>
                    <div className='flex'>
                      <input
                      required
                      className='h-10 flex-grow'
                      placeholder='Nhập đơn giá'
                      type="text"
                      value={item.price === 0 ? '' : formatNumber(item.price)}
                      onChange={(e) => handleInputChange(e, item.itemId, 'price')} />
                      <button type='button' className='text-center w-20 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleClickPrice(item.itemId)}>Còn lại</button>
                      <div className='lg:w-20'></div>
                    </div>

                  </td>
                  <td><input
                    type="Date"
                    className='h-7 w-full'
                    value={new Date(item.day).toISOString().substring(0, 10)}
                    onChange={(e) => handleInputChange(e, item.itemId, 'day')}
                  /></td>
                  <td className='text-center '>
                    <button type='button' className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelRow(item.itemId)}>xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className='text-center'>
                  <button type='button' className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddRow}>+ Thêm thanh toán</button></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className='flex'>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Lưu Dữ Liệu
          </button>
          <button
            className=" hover:text-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setOpenPDF(true)}
            type='button'
          >
            <div className='flex'>
              <ClipboardMinus /> Xem Trước PDF
            </div>
          </button>
        </div>
      </form>

      {openPDF && <div onClick={() => closePDFView()} className="fixed pt-64 overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center">
        <div className='mt-20'>
          <PrintPayment data={order} />
        </div>
      </div>}
    </div>
  )
}
