import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import './PrintStatistic.css'
import { sellerData } from '@/data/data';
import { numberToWords } from '@/data/function';
import LoadingScene from '../LoadingScene';
import { formatNumberToDot, formatNumberWithDot } from '@/data/listData';
import ExportToWord from './ExportToWord';
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
    const exportToWord = () => {
        const htmlContent = document.querySelector('.document');
        const styles = Array.from(document.styleSheets)
            .map((sheet) => {
                try {
                    return Array.from(sheet.cssRules).map((rule) => rule.cssText).join('');
                } catch (e) {
                    console.error('Error reading CSS rules:', e);
                    return '';
                }
            })
            .join('');
        const cssStyle = `
        .document {
            background-color: white;
            width: 800px;
            min-height: 1123px;
            font-family: 'Times New Roman', Times, serif;
        }
        
        .statistic-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .statistic-table th {
            border: 1px solid black;
            font-weight: bold;
            text-align: center;
        }
        
        .statistic-table td {
            border: 1px solid black;
        }`;
        ExportToWord(htmlContent, styles, cssStyle);

    }
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="z-99 fixed top-10 left-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export PDF
                </button>}
                content={() => componentRef.current}
            />
            <button type='button' className='fixed z-99 top-10 left-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={exportToWord}>Export to Word</button>
            <div className="document pt-10 overflow-auto " ref={componentRef}>
                <table className='w-full'>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center '>
                            <div className='font-bold'>
                                <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </span> <br />
                                <span className='underline decoration-solid'>Độc lập - Tự do - Hạnh phúc</span>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center pt-10'>
                            <div className='font-bold text-lg'>
                                <span>BIÊN BẢN NGHIỆM THU KHỐI LƯỢNG VÀ GIÁ TRỊ</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className='ml-10'>
                                <span>Căn cứ khối lượng thực tế</span>
                                <br />
                                <span>Hôm nay, ngày {today.getDate()} Tháng {today.getMonth() + 1} năm {today.getFullYear()}, chúng tôi gồm các bên:</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="ml-10 mr-10 ">
                                <span className='font-bold'>BÊN A (BÊN MUA): {props.data.statistic.customer.companyName}</span><br />
                                <table>
                                    <tr>
                                        <td><span>Đại diện: </span></td>
                                        <td className='w-48'><span className='font-bold'>{props.data.statistic.customer.representativeCustomer}</span></td>
                                        <td><span>Chức Vụ: <span className='font-bold'>{props.data.statistic.customer.positionCustomer}</span></span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Địa chỉ:</span></td>
                                        <td><span>{props.data.statistic.customer.address}</span></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><span>Mã số thuế:</span></td>
                                        <td><span>{props.data.statistic.customer.debt}</span></td>
                                        <td></td>
                                    </tr>
                                </table>
                                <span className='font-bold'>BÊN B (BÊN BÁN): {sellerData.companyName}</span><br />
                                <table>
                                    <tr>
                                        <td><span>Đại diện: </span></td>
                                        <td className='w-48'><span className='font-bold'>{props.data.statistic.customer.representativeCustomer}</span></td>
                                        <td><span>Chức Vụ: <span className='font-bold'>{props.data.statistic.customer.positionCustomer}</span></span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Địa chỉ:</span></td>
                                        <td><span>{props.data.statistic.customer.address}</span></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><span>Mã số thuế:</span></td>
                                        <td><span>{props.data.statistic.customer.debt}</span></td>
                                        <td></td>
                                    </tr>
                                </table>
                                <p>Hai bên thống nhất khối lượng, giá trị hàng đến 12 h 00&#39; ngày  {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()} như sau:</p>
                                <table className="statistic-table">
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center'>
                            <span className='font-bold'>ĐẠI DIỆN BÊN A</span>
                        </td>
                        <td className='text-center'>
                            <span className='font-bold'>ĐẠI DIỆN BÊN B</span>
                        </td>
                    </tr>
                </table>
                <div className='h-20'></div>
            </div>
        </div>
    );
};

export default PrintStatistic;