"use client"
import { DataGrid, GridColDef, GridPagination, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss"
import Image from "next/image";
import axios from "axios";
import DeletePattern from "@/ApiPattern/DeletePattern";
import postData from "@/ApiPattern/PostPattern";
import EditComponent from "../CRUDTAB/EditComponent";
import { useState } from "react";
import PutPattern from "@/ApiPattern/PutPattern";
import PaginationComponent from "../List/PaginationComponent/PaginationComponent";
import { useSearchParams } from "next/navigation";
type Props = {
  columns: GridColDef[],
  rows: object[],
  slug: string,
  validValueSchema: any,
  componentEditData: any
}

const DataTable = (props: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [items, setItems] = useState<any>([]);
  const handleDelete = async (id: string) => {
    console.log(id);
    console.log(props.rows, props.slug)
    if (props.slug == 'product') {
      let url = process.env.NEXT_PUBLIC_API_URL + `/api/${props.slug}/delete/` + id
      const response = await DeletePattern(url, {});
      console.log(response)
    }
    else {
      let url = process.env.NEXT_PUBLIC_API_URL + `/api/${props.slug}s/delete-customer?id=` + id
      const response = await postData(url, {}, {});
      console.log(response)
    }
    window.location.reload();
  };
  const handleEdit = async (items: any) => {
    console.log(items);
    setItems(items);
    setOpenEdit(true);
  }

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    renderCell: (params: any) => {
      return (
        <div className="action h-full flex justify-center items-center">
          <div className="edit" onClick={() => handleEdit(params.row)}>
            <Image src="/view.svg" width={10} height={10} alt="" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <Image src="/delete.svg" width={10} height={10} alt="" />
          </div>
        </div>
      );
    }
  }
  console.log(window.innerWidth)
  return (
    <div className="dataTable flex-1 m-2">
      {openEdit && <EditComponent items={items} componentData={props.componentEditData} validValueSchema={props.validValueSchema} slug={props.slug} apiUrl="" setOpen={setOpenEdit} />}
      <DataGrid
        className="dataGrid"
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
      />
      <div>
        <PaginationComponent />
      </div>

    </div>

  )
}

export default DataTable
