import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import './PrintStatistic.css'
import { sellerData } from '@/data/data';
import { numberToWords } from '@/data/function';
import LoadingScene from '../LoadingScene';
import { formatNumberToDot, formatNumberWithDot } from '@/data/listData';
type Props = {
    data: any
}
type StatisticItem = {
    id: number, day: string, licensePlate: string
    , trailer: string, ticket: string, typeProduct: string, proId: number, unit: string, price: number
    , materialWeight: number, note: string, statisticDetailId: any
}
type ParentStatisticItem = { proName: string, proUnit: string, proPrice: number, proId: number, statisticItems: StatisticItem[] }
const PrintStatistic = (props: Props) => {
    document.body.style.overflow = 'hidden';
    const componentRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<ParentStatisticItem[]>([]);
    const today = new Date(props.data.statistic.createAt)
    // console.log('print data: ', props.data);
    // console.log(today);
    useEffect(() => { setLoading(true) }, [props.data])
    if (loading) {
        <div>
            <LoadingScene />
        </div>
    }
    console.log(new Date(props.data.statistic.createAt));
    /// set item
    useEffect(() => {
        if (props.data) {
            let count = 0;
            const groupedItems = props.data.statisticDetails.reduce((acc: any, current: any) => {
                const existingItem = acc.find((item: any) => item.proId === current.proId);
                console.log(current);
                if (!existingItem) {
                    count = 0;
                    acc.push({
                        proName: current.typeProduct, proUnit: current.unit, proPrice: current.price
                        , proId: current.proId, statisticItems: [{
                            id: count, day: current.day, licensePlate: current.licensePlate
                            , trailer: current.trailer, ticket: current.ticket,
                            typeProduct: current.typeProduct, proId: current.proId,
                            unit: current.unit, price: current.price
                            , materialWeight: current.materialWeight, note: current.note,
                            statisticDetailId: current.id
                        }]
                    });
                } else {
                    count++;
                    existingItem.statisticItems.push({
                        id: count, day: current.day, licensePlate: current.licensePlate
                        , trailer: current.trailer, ticket: current.ticket,
                        typeProduct: current.typeProduct, proId: current.proId,
                        unit: current.unit, price: current.price
                        , materialWeight: current.materialWeight, note: current.note,
                        statisticDetailId: current.id
                    });
                }
                return acc;
            }, []);
            setItems(groupedItems);
            console.log(groupedItems);
        }
    }, [props.data]);
    let totalWeight: number[] = [];
    let totalCost: number[] = [];
    const TotalMaterialWeight = (index: number) => {
        const total: number = items[index].statisticItems.reduce((total, item) => { return total + Number(item.materialWeight) }, 0)
        const arrWeight = [...totalWeight]
        totalWeight[index] = total;
        // setTotalWeight(arrWeight);
        return total;
    }
    const HandleTotalCost = (index: number) => {
        const total = items[index].statisticItems.reduce((total, item) => { return total + item.price * item.materialWeight }, 0)
        const arr = [...totalCost]
        totalCost[index] = total;
        // setTotalCost(arr);
        return total;
    }
    const HandleTotalAmount = () => {
        const total = totalCost.reduce((total, item) => { return total + item }, 0)
        return total;
    }
    const HandletotalWeight = () => {
        const total = totalWeight.reduce((total, item) => { return total + item }, 0)
        return total;
    }
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="z-99 absolute top-10 left-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export PDF
                </button>}
                content={() => componentRef.current}
            />
            {/* <div className='lg:hidden block bg-gray-900 absolute top-5 text-gray-400 p-10'>Không khả dụng</div> */}
            <div ref={componentRef} className={`a4-sheet lg:block document`}>
                <div className="card-child card-2"><span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </span> <br /><span className='underline decoration-solid'>Độc lập - Tự do - Hạnh phúc</span></div>
                <div className="card-child card-3"><span>BIÊN BẢN NGHIỆM THU KHỐI LƯỢNG VÀ GIÁ TRỊ</span> </div>
                <div className='card-child card-1'>Căn cứ khối lượng thực tế<br />
                    Hôm nay, ngày {today.getDate()} Tháng {today.getMonth()+1} năm {today.getFullYear()}, chúng tôi gồm các bên:
                </div>

                <div className="card-child card-4">
                    <span className='font-bold'>BÊN A (BÊN MUA): {props.data.statistic.customer.companyName}</span><br />
                    <div>
                        <div className='flex'>
                            <div className='w-20'>
                                <span>Đại diện: </span>
                                <br />
                                <span>Địa chỉ:</span>
                                <br />
                                <span>Mã số thuế:</span>
                            </div>
                            <div className='w-3/4'>
                                <div className='flex w-1/2'>
                                    <span className='font-bold'>{props.data.statistic.customer.representativeCustomer}</span>
                                    <span className='text-right flex-grow'>Chức vụ: <span className='font-bold'>{props.data.statistic.customer.positionCustomer}</span></span>
                                </div>
                                <span>{props.data.statistic.customer.address}</span>
                                <br />
                                <span>{props.data.statistic.customer.debt}</span>
                            </div>
                        </div>
                    </div>
                    <span className='font-bold'>BÊN B (BÊN BÁN): {sellerData.companyName}</span><br />
                    <div>
                        <div className='flex'>
                            <div className='w-20'>
                                <span>Đại diện: </span>
                                <br />
                                <span>Địa chỉ:</span>
                                <br />
                                <span>Mã số thuế:</span>
                            </div>
                            <div className='w-3/4'>
                                <div className='flex w-1/2'>
                                    <span className='font-bold'>{sellerData.representativeSeller}</span>
                                    <span className='text-right flex-grow'>Chức vụ: <span className='font-bold'>{sellerData.positionSeller}</span></span>
                                </div>
                                <span>{sellerData.address}</span>
                                <br />
                                <span>{sellerData.taxCode}</span>
                            </div>
                        </div>
                        <p>Hai bên thống nhất khối lượng, giá trị hàng đến 12 h 00&#39; ngày  {today.getDate()}/{today.getMonth()+1}/{today.getFullYear()} như sau:</p>
                    </div>



                </div>
                <div className='card-child card-5'>
                    <table className="custom-table">
                        <thead>
                            <tr >
                                <th>STT</th>
                                <th>Ngày</th>
                                <th>Biển xe</th>
                                <th>Rơ moóc</th>
                                <th>Số phiếu</th>
                                <th>Loại Hàng</th>
                                <th>Đơn vị</th>
                                <th>Khối lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((parentItem, index) => (
                                <>
                                    {parentItem.statisticItems.map((item: StatisticItem, num) => (
                                        <tr key={num}>
                                            <td className='text-center'>{num + 1}</td>
                                            <td className='w-24'>{item.day.substring(0, 10)}</td>
                                            <td className='w-24'>{item.licensePlate}</td>
                                            <td className='w-24'>{item.trailer}</td>
                                            <td className='text-center'>{item.ticket}</td>

                                            <td className='relative text-center'>
                                                {parentItem.proName}
                                            </td>
                                            <td className='text-center'>{item.unit}</td>
                                            <td className='text-center'>{item.materialWeight}</td>
                                            <td>{item.price}
                                            </td>
                                            <td className='text-center'>{formatNumberWithDot((item.materialWeight * item.price), 2)}</td>
                                            <td>{item.note}</td>
                                        </tr>

                                    ))}
                                    <tr key={parentItem.proId} className='bg-yellow-200 text-sm'>
                                        <td className='text-center'></td>
                                        <td className='text-center' colSpan={6}>{parentItem.proName}</td>
                                        <td className='text-center'>{formatNumberToDot(TotalMaterialWeight(index))}</td>
                                        <td></td>
                                        <td className='text-center \'>{formatNumberToDot(HandleTotalCost(index))}</td>
                                        <td></td>
                                    </tr>
                                </>
                            ))}
                        </tbody >
                        <tfoot className='font-bold'>
                            <tr>
                                <td></td>
                                <td colSpan={6} className='text-center'>Tổng phát sinh chi phí </td>
                                <td className='text-center'>{HandletotalWeight() === 0 ? '' : HandletotalWeight()}</td>
                                <td></td>
                                <td>{formatNumberToDot(HandleTotalAmount())}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={11}><p className='text-center'>Bằng chữ: {numberToWords(HandleTotalAmount())} </p></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className='w-full flex justify-center items-center'>
                        <div className='inline-block'>

                            <p className='text-center'>Biên bản được thành lập 02 (hai) bản, mỗi bên giữ 01 (một) bản có giá trị pháp lý như nhau.</p>
                        </div>
                    </div>

                    <br />
                    <span className='font-bold mr-64 ml-20'>ĐẠI DIỆN BÊN A</span>
                    <span className='font-bold'>ĐẠI DIỆN BÊN B</span>

                </div>
            </div>

        </div>
    );
};

export default PrintStatistic;