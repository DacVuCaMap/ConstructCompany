import React, { useRef } from 'react'
import './PrintQLCN.css'
import ReactToPrint from 'react-to-print';
import { formatDateData, formatNumberToDot, formatNumberWithDot } from '@/data/listData';
import { numberToWords } from '@/data/function';
import { sellerData } from '@/data/data';
import ExportToWord from './ExportToWord';
type Props = {
  data: any,
  payments: any[]
}
export default function PrintQLCN(props: Props) {
  const componentRef = useRef(null);
  document.body.style.overflow = 'hidden';
  const today = new Date();
  //value
  const statistic = props.data;
  const order = statistic.order;
  const signingDate = new Date(order.signingDate);
  const customer = statistic.customer;
  const items = props.payments;
  const calcuTotal = () => {
    return items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);
  }
  const calCashLeft = () => {
    return statistic.cashLeft + calcuTotal() - statistic.totalAmount;
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
      <div ref={componentRef} className="pt-10 overflow-auto document">
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
                <h4 className='text-center'>BIÊN BẢN ĐỐI CHIẾU CÔNG NỢ</h4>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className='ml-10 mr-10'>
                  <span>  - Căn cứ vào hợp đồng số: {order.contractCode} /HĐNT/LĐ-PA  - Ký ngày {signingDate.getDate()} tháng {signingDate.getMonth() + 1} năm {signingDate.getFullYear()} giữa {sellerData.companyName} với {customer.companyName}</span> <br />
                  <span>- Căn cứ Biên bản giao nhận thực tế giữa hai bên</span>
                  <br />
                  <span>   Hôm nay ngày 29  tháng  04 năm 2024, tại {sellerData.companyName} chúng tôi gồm có:</span>
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
                      <td><span>{customer.debt}</span></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3}><span className='font-bold'>BÊN B (BÊN BÁN): {sellerData.companyName}</span></td>
                    </tr>
                    <tr>
                      <td><span>Đại diện: </span></td>
                      <td className='w-48'><span className='font-bold'>{sellerData.representativeSeller}</span></td>
                      <td><span>Chức Vụ: <span className='font-bold'>{sellerData.positionSeller}</span></span></td>
                    </tr>
                    <tr>
                      <td><span>Địa chỉ:</span></td>
                      <td colSpan={2}><span>{sellerData.address}</span></td>
                    </tr>
                    <tr>
                      <td><span>Mã số thuế:</span></td>
                      <td><span>{sellerData.taxCode}</span></td>
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
                      <tr key={"n1"}>
                        <td className="text-center"><p><strong>I</strong></p></td>
                        <td><p><strong>Số dư đầu kỳ</strong></p></td>
                        <td className='text-center'><p><strong>{formatNumberWithDot(statistic.cashLeft,2)}</strong></p></td>
                        <td></td>
                      </tr>
                      <tr key={"n2"}>
                        <td className="text-center"><p><strong>II</strong></p></td>
                        <td><p><strong>Số tiền đã thanh toán trong kỳ</strong></p></td>
                        <td className='text-center'><p><strong>{formatNumberWithDot(calcuTotal(), 2)}</strong></p></td>
                        <td></td>
                      </tr>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td className='text-center'>{formatDateData(item.day.substring(0, 10))}</td>
                          <td ><p>{item.description}</p></td>
                          <td className='text-center'>{formatNumberWithDot(item.price, 2)}</td>
                          <td></td>
                        </tr>
                      ))}
                      <tr key={"3n"}>
                        <td className="text-center"><p><strong>III</strong></p></td>
                        <td><p><strong>Phát sinh trong kỳ</strong></p></td>
                        <td className='text-center'><p><strong>{formatNumberWithDot(statistic.totalAmount, 2)}</strong></p></td>
                        <td></td>
                      </tr>
                      <tr key={"4n"}>
                        <td></td>
                        <td><p>Từ ngày {formatDateData(statistic.startDay)} đến ngày {formatDateData(statistic.endDay)}</p></td>
                        <td className='text-center'><p>{formatNumberWithDot(statistic.totalAmount, 2)}</p></td>
                        <td></td>
                      </tr>
                    </tbody >
                    <tfoot className='font-bold text-center'>
                      <tr key={"5n"}>
                        <td className="text-center"><p><strong>IV</strong></p></td>
                        <td><p><strong>Đối trừ công nợ (IV=I+II-III)</strong></p></td>
                        <td></td>
                        <td className='text-center'><p>{formatNumberWithDot(calCashLeft(), 2)}</p></td>
                      </tr>
                    </tfoot>
                  </table>
                  <br />
                  <p style={{ "textIndent":"30px" }}> Sau khi đối chiếu sổ sách giữa {sellerData.companyName} và {customer.companyName} 
                    từ ngày {statistic.startDay} đến   ngày {statistic.endDay} {sellerData.companyName} còn dư tiền tại 
                    {sellerData.companyName} số tiền là:  <strong>{formatNumberWithDot(calCashLeft(), 2)}</strong> </p>
                  <p className='text-center font-bold'><strong>(Bằng chữ: {numberToWords(calCashLeft())})</strong></p>
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
    </div>
  )
}
