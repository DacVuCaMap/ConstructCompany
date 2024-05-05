'use client'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import PaginationComponent from "../List/PaginationComponent/PaginationComponent";
import "./dataTable.scss"
import { useRef, useState } from "react";
import PrintPayment from "../PrintComponent/PrintPayment";
import { useRouter } from "next/navigation";
import { formatNumberWithDot } from "@/data/listData";
type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string,
    validValueSchema: any,
    componentEditData: any
}

export default function PaymentDataTable(props: Props) {
    const route = useRouter();
    const [openPDF, setOpenPDF] = useState(false);
    const [data,setData] = useState<any>();
    const handleRowClick = (params: any) => {
        //open pdf
        // setData(params.row);
        // setOpenPDF(true);
        route.push('/payment/get/'+params.row.id);
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
            
        </div>

    )
}


