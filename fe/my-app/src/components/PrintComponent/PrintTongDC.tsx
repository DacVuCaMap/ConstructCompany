import React, { useEffect, useRef, useState } from 'react'
import './PrintQLCN.css'
import ReactToPrint from 'react-to-print';
import { formatDateData, formatNumberToDot, formatNumberWithDot } from '@/data/listData';
import { numberToWords } from '@/data/function';
import { sellerData } from '@/data/data';
import ExportToWord from './ExportToWord';
import GetSeller from '@/ApiPattern/GetSeller';
type Props = {
    statistics: any[],
}
export default function PrintTongDC(props: Props) {
    //seller 
    const [seller,setSeller] = useState(sellerData);
    useEffect(()=>{
        const fetch=async()=>{
            const data = await GetSeller();
            setSeller(data);
        }
        fetch();
    },[])
    const componentRef = useRef(null);
    document.body.style.overflow = 'hidden';
    const today = new Date();
    //value
    const statistics: any[] = props.statistics;
    const order = statistics[0].order;
    const signingDate = new Date(order.signingDate);
    const customer = statistics[0].customer;
    const toDay = new Date();
    const calcuTotal = (items: any[]) => {
        if (Array.isArray(items)) {
            return items.reduce((accumulator: any, currentItem: any) => {
                return accumulator + currentItem.price;
            }, 0);
        } else {
            return 0; // or handle the case when items is not an array
        }

    }
    const calCashLeft = (statistic: any) => {
        return statistic.cashLeft + calcuTotal(statistic.payments) - statistic.totalAmount;
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
      width: 794px;
      min-height: 1123px;
      font-family: 'Times New Roman', Times, serif;
  }
  
  .QLCN-table {
      width: 100%;
      border-collapse: collapse;
  }
  
  .QLCN-table th {
      border: 1px solid black;
      font-weight: bold;
      text-align: center;
  }
  
  .QLCN-table td {
      border: 1px solid black;
  }`;
        ExportToWord(htmlContent, styles, cssStyle);

    }
    const total = (key: string) => {
        let tot = statistics.reduce((total, item) => {
            return total + item[key]
        }, 0)
        return tot;
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
                onClick={() => exportToWord()}>Export to Word</button>
            <div ref={componentRef} className="pt-10 overflow-auto document" onClick={(e) => e.stopPropagation()}>
                <table className=' w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className=''>
                            <td colSpan={2} className='text-center'>
                                <div className="font-bold">
                                    <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </span>
                                    <br />
                                    <span className='underline decoration-solid'>Độc lập - Tự do - Hạnh phúc</span>
                                    <br />
                                    <span>--------o0o--------</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div className='text-right mr-10'>Hà Nội, ngày {today.getDate()} tháng {today.getMonth() + 1} năm  {today.getFullYear()}</div>
                            </td>
                        </tr>
                        <tr className=''>
                            <td colSpan={2} className='font-bold'>
                                <h4 className='text-center'>BIÊN BẢN ĐỐI CHIẾU CÁC CÔNG NỢ</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='ml-10 mr-10'>
                                    <span>  - Căn cứ vào hợp đồng số: {order.contractCode} /HĐNT/LĐ-PA  - Ký ngày {signingDate.getDate()} tháng {signingDate.getMonth() + 1} năm {signingDate.getFullYear()} giữa {seller.companyName} với {customer.companyName}</span> <br />
                                    <span>- Căn cứ Biên bản giao nhận thực tế giữa hai bên</span>
                                    <br />
                                    <span>   Hôm nay ngày {today.getDate()}  tháng  {today.getMonth() + 1} năm {today.getFullYear()}, tại {seller.companyName} chúng tôi gồm có:</span>
                                    <br />
                                    <span className='font-bold'>BÊN A (BÊN MUA): {customer.companyName}</span><br />
                                    <table>
                                        <tr>
                                            <td><span>Đại diện: </span></td>
                                            <td className='w-48'><span className='font-bold'>{customer.representativeCustomer}</span></td>
                                            <td><span>Chức Vụ: <span className='font-bold'>{customer.positionCustomer}</span></span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Địa chỉ:</span></td>
                                            <td colSpan={2}><span>{customer.address}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Mã số thuế:</span></td>
                                            <td><span>{customer.taxCode}</span></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><span className='font-bold'>BÊN B (BÊN BÁN): {seller.companyName}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Đại diện: </span></td>
                                            <td className='w-48'><span className='font-bold'>{seller.representativeSeller}</span></td>
                                            <td><span>Chức Vụ: <span className='font-bold'>{seller.positionSeller}</span></span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Địa chỉ:</span></td>
                                            <td colSpan={2}><span>{seller.address}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Mã số thuế:</span></td>
                                            <td><span>{seller.taxCode}</span></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='ml-10 mr-10'>
                                    <table className="QLCN-table">
                                        <thead>
                                            <tr >
                                                <th>STT</th>
                                                <th>Nội Dung</th>
                                                <th>Số tiền</th>
                                                <th>Còn lại</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {statistics.map((statistic: any, parentIndex) => (
                                                <>
                                                    <tr>
                                                        <td colSpan={4} className='text-center'><p><strong>Kỳ {parentIndex + 1}: Từ ngày {formatDateData(statistic.startDay.substring(0, 10))} đến ngày {formatDateData(statistic.endDay.substring(0, 10))}</strong></p></td>
                                                    </tr>
                                                    <tr key={"n1" + parentIndex}>
                                                        <td className="text-center"><p><strong>I</strong></p></td>
                                                        <td><p><strong>Số dư đầu kỳ</strong></p></td>
                                                        <td className='text-center'><p><strong>{formatNumberWithDot(statistic.cashLeft, 2)}</strong></p></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr key={"n2" + parentIndex}>
                                                        <td className="text-center"><p><strong>II</strong></p></td>
                                                        <td><p><strong>Số tiền đã thanh toán trong kỳ</strong></p></td>
                                                        <td className='text-center'><p><strong>{formatNumberWithDot(calcuTotal(statistic.payments), 2)}</strong></p></td>
                                                        <td></td>
                                                    </tr>
                                                    {
                                                        statistic.payments.map((item: any, index: number) => (
                                                            <tr key={index}>
                                                                <td className='text-center'><p>{formatDateData(item.day.substring(0, 10))}</p></td>
                                                                <td ><p>{item.description}</p></td>
                                                                <td className='text-center'><p>{formatNumberWithDot(item.price, 2)}</p></td>
                                                                <td></td>
                                                            </tr>
                                                        ))
                                                    }
                                                    < tr key={"3n" + parentIndex} >
                                                        <td className="text-center"><p><strong>III</strong></p></td>
                                                        <td><p><strong>Phát sinh trong kỳ</strong></p></td>
                                                        <td className='text-center'><p><strong>{formatNumberWithDot(statistic.totalAmount, 2)}</strong></p></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr key={"4n" + parentIndex}>
                                                        <td></td>
                                                        <td><p>Từ ngày {formatDateData(statistic.startDay)} đến ngày {formatDateData(statistic.endDay)}</p></td>
                                                        <td className='text-center'><p>{formatNumberWithDot(statistic.totalAmount, 2)}</p></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr key={"5n" + parentIndex}>
                                                        <td className="text-center"><p><strong>IV</strong></p></td>
                                                        <td><p><strong>Đối trừ công nợ (IV=I+II-III)</strong></p></td>
                                                        <td></td>
                                                        <td className='text-center'><p>{formatNumberWithDot(calCashLeft(statistic), 2)}</p></td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody >
                                        <tfoot className='font-bold text-center'>
                                            <tr>
                                                {/* <td className='border-r-0'></td> */}
                                                <td className='text-center' colSpan={2}><p><strong>Tổng tiền dư đầu kỳ còn lại</strong></p></td>
                                                <td className='text-center'><p><strong>{formatNumberWithDot(calCashLeft(statistics[statistics.length - 1]), 2)}</strong></p></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                {/* <td className='border-r-0'></td> */}
                                                <td className='text-center' colSpan={2}><p><strong>Tổng tiền đã thanh toán</strong></p></td>
                                                <td className='text-center'><p><strong>{formatNumberWithDot(total('totalPay'), 2)}</strong></p></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                {/* <td className='border-r-0'></td> */}
                                                <td className='text-center' colSpan={2}><p><strong>Tổng tiền phát sinh trong kỳ</strong></p></td>
                                                <td className='text-center'><p><strong>{formatNumberWithDot(total('totalAmount'), 2)}</strong></p></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>
                                                    <p><strong>Tổng thành tiền thanh toán: {formatNumberWithDot(order.totalAmount, 0)}</strong></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>
                                                    <p><strong>Tổng tiền cần thanh toán còn lại: {formatNumberWithDot(order.totalAmount - total('totalPay'), 0)}</strong></p>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <br />
                                    <p style={{ "textIndent": "30px" }}>  Sau khi đối chiếu sổ sách giữa {seller.companyName} và {customer.companyName} từ
                                        ngày {formatDateData(statistics[0].startDay)} đến ngày {formatDateData(statistics[statistics.length - 1].endDay)} {seller.companyName} còn 
                                        dư tiền tại {seller.companyName} số tiền là:  <strong>{formatNumberWithDot(order.totalAmount - total('totalPay'), 0)}</strong> </p>
                                    <p className='text-center font-bold'><strong>(Bằng chữ: {numberToWords(order.totalAmount - total('totalPay'))} đồng)</strong></p>
                                    <p>Số liệu trên đây hoàn toàn là chính xác. Đây là số liệu có giá trị pháp lý làm cơ sở thanh toán giữa hai bên.
                                        <br />Biên bản được lập thành 04 bản, mỗi bên giữ 02 bản có giá trị như nhau .
                                    </p>
                                    <br />
                                </div>
                            </td>
                        </tr>
                        <tr className='font-bold'>
                            <td className='text-center'>
                                <p>XÁC NHẬN BÊN MUA</p>
                            </td>
                            <td className='text-center'>
                                <p>XÁC NHẬN BÊN BÁN</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}
