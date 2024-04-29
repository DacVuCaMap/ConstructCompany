'use client'
import postData from '@/ApiPattern/PostPattern';
import OpenWindowSearchCus from '@/components/InvoiceComponents/OpenWindowSearchCus/OpenWindowSearchCus';
import { sellerData } from '@/data/data';
import { schemaStatistic } from '@/data/schemaData';
import { yupResolver } from '@hookform/resolvers/yup';
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import StatisticDetailsData from './StatisticDetailsData';
import TableEditStatistic from '../TableAddStatistic/TableEditStatistic';
import { ClipboardMinus } from 'lucide-react';
import PrintStatistic from '@/components/PrintComponent/PrintStatistic';
type Customer = {
  id: number,
  companyName: string,
  representativeCustomer: string,
  positionCustomer: string
}
export default function StatisticDetails(param: any) {
  const route = useRouter()
  const [dataEdit, setDataEdit] = useState<any>();
  //state
  const [openWindowCus, setOpenWindowCus] = useState(false);
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [totalAmount, setTotalAmount] = useState<any>();
  const [statisticDetails, setStatisticDetails] = useState<any[]>([]);
  //getData
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await StatisticDetailsData(param.param);
        console.log(response);
        if (!response) {
          router.push('/404');
        }
        setDataEdit(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [])
  useEffect(() => {
    if (dataEdit && dataEdit.statistic && dataEdit.statisticDetails) {
      setCustomer(dataEdit.statistic.customer);
      setStatisticDetails(dataEdit.statisticDetails);
    }
  }, [dataEdit])

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaStatistic),
  });

  //handle open
  useEffect(() => {
    if (customer && customer.id) {
      // console.log(customer)
      setValue('customerId', customer.id);
      setValue('representativeCustomer', customer.representativeCustomer)
      setValue('positionCustomer', customer.positionCustomer)
      // console.log(customer)
    }
  }, [customer]);
  //submit form data
  const onSubmit = async (data: any) => {
    const dataPost = { statistic: { id:dataEdit.statistic.id,...data, totalAmount: totalAmount }, statisticDetails: [...statisticDetails] }

    const urlPost = process.env.NEXT_PUBLIC_API_URL + '/api/statistic/edit';
    // console.log(dataPost)
    const post = await postData(urlPost, dataPost, {});
    // console.log(post)
    router.push('/statistic/list?size=10&page=0');
  }
  //PDF
  const [openPDF, setOpenPDF] = useState(false);
  const closePDFView = () => {
    setOpenPDF(false);
    document.body.style.overflow = 'unset';
  }
  return (
    <div className="flex justify-center items-center h-full  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full lg:max-w-7xl  "
      >
        <h2 className='block text-3xl text-gray-900 font-bold mb-4'>Chỉnh sửa Biên Bản nghiệm thu và xác nhận khối lượng</h2>
        <div className={`flex lg:flex-row flex-col`}>
          <div className='flex-auto m-1'>
            <div className='mb-2'>
              <label
                className="block text-gray-700 font-bold mb-2"
              >
                Đại diện bên mua:
              </label><input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.customerId ? 'border-red-500' : ''}`}
                id="1"
                type="text"
                readOnly
                placeholder='Nhấn để chọn Công Ty'
                onClick={() => setOpenWindowCus(true)}
                value={customer?.companyName} />
              <input type="hidden" value={customer?.id} {...register('customerId')} />
              {errors.customerId && (
                <p className="text-red-500 text-xs italic">{errors.customerId.message}</p>
              )}
              {openWindowCus && <OpenWindowSearchCus setOpen={setOpenWindowCus} setCustomer={setCustomer} />}
            </div>
            <div className='flex pb-4 mb-4 border-b border-neutral-400'>
              <div className='mr-1'>
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Người Đại diện(Bên mua):
                </label><input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.representativeCustomer ? 'border-red-500' : ''}`}
                  id="2"
                  type="text"
                  placeholder='Người đại diện'
                  value={customer?.representativeCustomer}
                  {...register('representativeCustomer')} />
                {errors.representativeCustomer && (
                  <p className="text-red-500 text-xs italic">{errors.representativeCustomer.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Chức Vụ(Bên mua):
                </label><input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.positionCustomer ? 'border-red-500' : ''}`}
                  id="3"
                  type="text"
                  placeholder='Chức vụ người đại diện'
                  value={customer?.positionCustomer}
                  {...register('positionCustomer')} />
                {errors.positionCustomer && (
                  <p className="text-red-500 text-xs italic">{errors.positionCustomer.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className='lg:w-5'></div>
          <div className='flex-auto m-1'>
            <div className='mb-2'>
              <label
                className="block text-gray-700 font-bold mb-2"
              >
                Đại diện bên bán
              </label><input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.sellerId ? 'border-red-500' : ''}`}
                id="4"
                type="text"
                value={sellerData.companyName} />
              <input type="hidden" id="5" value={sellerData.id} {...register('sellerId')} />
              {errors.sellerId && (
                <p className="text-red-500 text-xs italic">{errors.sellerId.message}</p>
              )}
            </div>
            <div className='flex mb-4 pb-4 border-b border-neutral-400'>
              <div className='mr-1'>
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Người Đại diện(Bên bán):
                </label><input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.representativeSeller ? 'border-red-500' : ''}`}
                  id="1"
                  type="text"
                  value={sellerData.representativeSeller}
                  placeholder='Người đại diện'
                  {...register('representativeSeller')} />
                {errors.representativeSeller && (
                  <p className="text-red-500 text-xs italic">{errors.representativeSeller.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Chức Vụ(Bên bán):
                </label><input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.positionSeller ? 'border-red-500' : ''}`}
                  id="1"
                  type="text"
                  placeholder='Chức vụ'
                  value={sellerData.positionSeller}
                  {...register('positionSeller')} />
                {errors.positionSeller && (
                  <p className="text-red-500 text-xs italic">{errors.positionSeller.message}</p>
                )}
              </div>
            </div>
          </div>

        </div>
        <div className='mt-2 mb-2 '>
          {/* <div className='flex pb-4 mb-4 border-b border-neutral-400'>
                <div className='mr-1'>
                    <label
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Ngày Kí Hợp Đồng:
                    </label><input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.representativeCustomer ? 'border-red-500' : ''}`}
                        id="10"
                        type="date"
                        {...register('signingDateForm')} />
                    {errors.representativeCustomer && (
                        <p className="text-red-500 text-xs italic">{errors.representativeCustomer.message}</p>
                    )}
                </div>

            </div> */}
          {dataEdit && dataEdit.statisticDetails ? <TableEditStatistic setTotalAmount={setTotalAmount} editData={dataEdit.statisticDetails} setStatisticDetails={setStatisticDetails} /> : ''}
        </div>


        <div className="flex">
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
              <ClipboardMinus /> Xem Trước Tài Liệu
            </div>
          </button>
        </div>
        {openPDF && dataEdit ? <div onClick={() => closePDFView()} className="fixed overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center">
          <div className='mt-20'>
            <PrintStatistic data={dataEdit} />
          </div>
        </div> : ''}
      </form>
    </div>
  )
}
