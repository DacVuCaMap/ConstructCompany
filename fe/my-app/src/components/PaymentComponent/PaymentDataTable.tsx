'use client'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import PaginationComponent from "../List/PaginationComponent/PaginationComponent";
import "./dataTable.scss"
import { useRef, useState } from "react";
import PrintPayment from "../PrintComponent/PrintPayment";
import { useRouter } from "next/navigation";
import { formatNumberWithDot } from "@/data/listData";
import ShowListStatistic from "./ShowListStatistic";
import Image from "next/image";
import Link from "next/link";
import postData from "@/ApiPattern/PostPattern";
import GetPattern from "@/ApiPattern/GetPattern";
import PrintQLCN from "../PrintComponent/PrintQLCN";
import PrintTongDC from "../PrintComponent/PrintTongDC";
type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string,
    validValueSchema: any,
    componentEditData: any
}

export default function PaymentDataTable(props: Props) {
    const route = useRouter();
    const [openList, setOpenList] = useState(false);
    const [data, setData] = useState<any>();
    const [docData,setDocData] = useState<any>();
    const [showData, setShowData] = useState<any>();

    //new update
    const [openPDFDCCN,setOpenPDFDCCN] = useState(false);
    const handleRowClick = (params: any) => {
        //open pdf
        // setData(params.row);
        // setOpenPDF(true);
        // route.push('/payment/get/'+params.row.id);
        console.log(params.row);
        setShowData(params.row);
        setOpenList(true);
    }
    const handleCancle = () => {
        setOpenList(false);
        document.body.style.overflow = 'unset';
    }
    const handleDelete = async (id: any) => {
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/${props.slug}/delete-order?id=` + id
        const response = await postData(url, {}, {});
        console.log(response)
        window.location.reload();
    }
    const handleShowDoc = async (id: any) => {
        let url = process.env.NEXT_PUBLIC_API_URL + "/api/statistic/listbyorder?id=" + id;
        const response = await GetPattern(url, {});
        setDocData(response);
        setOpenPDFDCCN(true);
        console.log(response);
    }
    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        renderCell: (params: any) => {
            return (
                <div className="action h-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <Image src="/delete.svg" width={10} height={10} alt="" />
                    </div>
                </div>
            );
        }
    }
    const showDocColumn: GridColDef = {
        field: "showDoc",
        headerName: "Xem trước",
        renderCell: (params: any) => {
            return (
                <div className="action h-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                    <span onClick={() => handleShowDoc(params.row.id)} className="underline text-blue-500 hover:text-blue-700">Đối Chiếu Tổng</span>
                </div>
            );
        }
    }
    //print pdf
    const closePDFView=()=>{
        document.body.style.overflow = 'unset';
        setOpenPDFDCCN(false);

    }
    
    return (
        <div>
            {openList && <div onClick={handleCancle} className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 '>
                <ShowListStatistic setOpen={setOpenList} data={showData} />
            </div>}
            {openPDFDCCN && <div onClick={() => closePDFView()} className="fixed overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center ">
                <div className='mt-20'>
                    <PrintTongDC statistics={docData} />
                </div>
            </div>}
            <div className="dataTable flex-1 m-2 ">

                <DataGrid
                    className="dataGrid hover:cursor-pointer"
                    rows={props.rows}
                    columns={window.innerWidth < 768 ? [...props.columns.slice(0, 3), showDocColumn, actionColumn] : [...props.columns, showDocColumn, actionColumn]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slotProps={{
                        filterPanel: {
                            disableAddFilterButton: true,
                            disableRemoveAllButton: true,
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    disableColumnFilter
                    onRowClick={handleRowClick}
                />
                <div>
                    <PaginationComponent />
                </div>

            </div>
        </div>

    )
}


