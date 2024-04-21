'use client'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import PaginationComponent from "../List/PaginationComponent/PaginationComponent";
import "./dataTable.scss"
import { useRef, useState } from "react";
import PrintPayment from "../PrintComponent/PrintPayment";
type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string,
    validValueSchema: any,
    componentEditData: any
}

export default function PaymentDataTable(props: Props) {
    const [openPDF, setOpenPDF] = useState(false);
    const [data,setData] = useState<any>();
    const handleRowClick = (params: any) => {
        //open pdf
        setData(params.row);
        setOpenPDF(true);
    }
    const closePDFView = () => {
        setOpenPDF(false);
        document.body.style.overflow = 'unset';
    }
    return (
        <div className="dataTable flex-1 m-2 ">

            <DataGrid
                className="dataGrid hover:cursor-pointer"
                rows={props.rows}
                columns={window.innerWidth<768 ? [...props.columns.slice(0, 3)] : [...props.columns]}
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
            {openPDF && <div onClick={() => closePDFView()} className="fixed pt-64 overflow-auto top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center">
                <div className='mt-20'>
                    <PrintPayment data={data}/>
                </div>
            </div>}
        </div>

    )
}


