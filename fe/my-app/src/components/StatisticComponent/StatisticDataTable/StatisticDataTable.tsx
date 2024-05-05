'use client'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss"
import { useRef, useState } from "react";
import PaginationComponent from "@/components/List/PaginationComponent/PaginationComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import postData from "@/ApiPattern/PostPattern";
import { formatNumberWithDot } from "@/data/listData";
type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string,
    totalLeft:number
}

export default function StatisticDataTable(props: Props) {
    const router = useRouter();
    const handleRowClick = (params: any) => {
        //open pdf
        router.push('/statistic/get/' + params.row.id)
    }
    const handleDelete = async (id: number) => {
        //delete
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/statistic/delete?id=` + id
        const response = await postData(url, {}, {});
        console.log(response)
        window.location.reload();
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
    return (
        <div className="dataTable flex-1 m-2 relative">
            <DataGrid
                className="dataGrid hover:cursor-pointer"
                rows={props.rows}
                columns={window.innerWidth<768 ? [...props.columns.slice(0, 3), actionColumn] : [...props.columns, actionColumn]}
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


