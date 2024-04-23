
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './AddOrderProduct.scss';
import OpenWindowSearchCus from '../OpenWindowSearchCus/OpenWindowSearchCus';
import { sellerData } from '@/data/data';
import postData from '@/ApiPattern/PostPattern';
import TableOrderDetails from '../OrderDetail/TableOrderDetails';
import { ClipboardMinus } from 'lucide-react';
import PrintInvoice from '@/components/PrintComponent/PrintInvoice';
import ReactToPrint from 'react-to-print';
import { schemaOrder } from '@/data/schemaData';
import { useRouter } from 'next/navigation';
type Cost = { totalCost: number, tax: number, totalAmount: number }
type Props = {
    orderData: any
}
const schema = yup.object().shape({
    customerId: yup.number().notOneOf([-1], "Không để trống").required("Không để trống customer"),
    representativeSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionCustomer: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    positionSeller: yup.string().min(5, 'Trên 5 ký tự').required("Không để trống"),
    representativeCustomer: yup.string().required("Không để trống"),
    sellerId: yup.number().required("Khong de trong"),
    Tax: yup.string(),
    TotalCost: yup.number(),
});

export default function EditOrder(props: Props) {
    const route = useRouter();
    const sellerDt = sellerData;
    const [orderDetailsProps, setOrderDetailsProps] = useState<any[]>([]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [customer, setCustomer] = useState<{
        id: number,
        companyName: string,
        representativeCustomer: string,
        positionCustomer: string
    }>({
        id: -1,
        companyName: '',
        representativeCustomer: '',
        positionCustomer: ''
    });
    // id: cus.id,
    // companyName:cus.companyName,
    // representativeCustomer: cus.representativeCustomer,
    // positionCustomer: cus.positionCustomer
    const [showWindow, setShowWindow] = useState(false);
    const [orderDetail, setOrderDetail] = useState<any>();
    const [cost, setCost] = useState<Cost>({ totalCost: 0, tax: 0.1, totalAmount: 0 });
    const [contractCode,setContractCode] = useState<any>();
    const inpRef = useRef(null);
    const [createAt, setCreateAt] = useState<Date>(new Date());
    const [numberWords,setNumberWords] = useState('');
    const [signingDate,setSigningDate] = useState<Date>(new Date());
    useEffect(() => {
        if (props.orderData && props.orderData.order && props.orderData.order.customer) {
            setCustomer({
                id: props.orderData.order.customer.id,
                companyName: props.orderData.order.customer.companyName,
                representativeCustomer: props.orderData.order.customer.representativeCustomer,
                positionCustomer: props.orderData.order.customer.positionCustomer
            });
        }
        if (props.orderData.orderDetails) {
            setOrderDetailsProps(props.orderData.orderDetails)
        }
        if (props.orderData.order) {
            setCreateAt(props.orderData.order.createAt);
            setSigningDate(new Date(props.orderData.order.signingDate));
            setContractCode(props.orderData.order.contractCode);
        }
    }, [props.orderData])
    useEffect(() => {
        if (customer && customer.id) {
            // console.log(customer)
            setValue('customerId', customer.id);
            setValue('representativeCustomer', customer.representativeCustomer)
            setValue('positionCustomer', customer.positionCustomer)
            // console.log(customer)
        }
    }, [customer]);
    const handleOpenWindow = () => {
        setShowWindow(true);
    }
    // update cost
    const onSubmit = async (data: any) => {

        let urlPost = process.env.NEXT_PUBLIC_API_URL + '/api/order/edit-order'
        console.log(urlPost);

        const dataPost = { order: { id:props.orderData.order.id,...data, ...cost,contractCode:contractCode,signingDate:signingDate.toISOString().substring(0,10) }, orderDetails: orderDetail }
        console.log("dataPost", dataPost)

        const post = await postData(urlPost, dataPost, {});
        console.log(post)
        route.push('/invoice/list?size=10&page=0')
    };

    //open print
    const componentRef = useRef<HTMLDivElement>(null);
    const [openPDF, setOpenPDF] = useState(false);
    const closePDFView = ()=>{
        setOpenPDF(false);
        document.body.style.overflow = 'unset';
    }
    const handleSigningDate=(e:any)=>{
        setSigningDate(new Date(e.target.value));
    }
    return (
        <div className="flex justify-center items-center h-full  ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full lg:max-w-5xl  "
            >
                <h2 className='block text-3xl text-gray-900 font-bold mb-4'>Biên bản nghiệm thu và xác nhận khối lượng</h2>
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
                                onClick={() => handleOpenWindow()}
                                value={customer?.companyName} />
                            <input type="hidden" value={customer?.id} {...register('customerId')} />
                            {errors.customerId && (
                                <p className="text-red-500 text-xs italic">{errors.customerId.message}</p>
                            )}
                            {showWindow && <OpenWindowSearchCus setOpen={setShowWindow} setCustomer={setCustomer} />}
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
                                value={sellerDt.companyName} />
                            <input type="hidden" id="5" value={sellerDt.id} {...register('sellerId')} />
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
                <div className='flex pb-4 mb-4 border-b border-neutral-400'>
                        <div className='mr-1'>
                            <label
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Ngày Kí Hợp Đồng:
                                </label><input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.representativeCustomer ? 'border-red-500' : ''}`}
                                    id="10"
                                    type="date"
                                    value={signingDate.toISOString().substring(0,10)}
                                    required 
                                    onChange={(e)=>handleSigningDate(e)}/>
                            {errors.representativeCustomer && (
                                <p className="text-red-500 text-xs italic">{errors.representativeCustomer.message}</p>
                            )}
                        </div>
                    </div>
                    <TableOrderDetails setCost={setCost} setOrderDetail={setOrderDetail} cost={cost} orderDetailsProps={orderDetailsProps} />
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
                            <ClipboardMinus /> Xem Trước PDF
                        </div>
                    </button>
                </div>
            </form>
            {openPDF && <div onClick={() => closePDFView()} className="fixed pt-64 overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center">
                <div className='mt-20'>
                    <ReactToPrint trigger={() => <button className="z-99 absolute top-10 left-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Export PDF
                    </button>
                    }
                        content={() => componentRef.current} />
                    <PrintInvoice ref={componentRef} data={{
                        createAt: new Date(createAt),
                        companyName: customer.companyName,
                        representativeCustomer: customer.representativeCustomer,
                        positionCustomer: customer.positionCustomer,
                        orderDetails: orderDetail,
                        contractCode:props.orderData.order.contractCode,
                        tax:props.orderData.order.tax,
                        totalAmount:props.orderData.order.totalAmount
                    }} />
                </div>
            </div>}

        </div>
    );
}