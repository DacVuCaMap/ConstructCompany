"use client"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss"
import Image from "next/image";
import DeletePattern from "@/ApiPattern/DeletePattern";
import postData from "@/ApiPattern/PostPattern";
import { useState } from "react";
import PaginationComponent from "../List/PaginationComponent/PaginationComponent";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
type Props = {
  columns: GridColDef[],
  rows: object[],
  slug: string,
  validValueSchema: any,
  componentEditData: any,
  pag:boolean
}

const DataTable = (props: Props) => {

  const router = useRouter();
  const handleDelete = async (id: string) => {
    let url = process.env.NEXT_PUBLIC_API_URL + `/api/${props.slug}/delete-order?id=` + id
    const response = await postData(url, {}, {});
      console.log(response)
    window.location.reload();
  };
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    flex:0.2,
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
  const handleRowClick = (params:any) => {
    console.log(params)
    router.push(`/invoice/get/${params.row.id}`)
  }
  return (
    <div className="dataTable flex-1 m-2 ">
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
        columnVisibilityModel={{
          id: false,
        }}
      />
      <div>
        <PaginationComponent />
      </div>

    </div>

  )
}

export default DataTable
