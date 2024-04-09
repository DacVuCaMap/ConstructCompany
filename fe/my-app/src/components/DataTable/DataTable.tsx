import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss"
import Image from "next/image";
type Props = {
  columns: GridColDef[],
  rows: object[],
  slug: string;
}



function DataTable(props: Props) {

  const handleDelete = async (id: string) => {
    //delete the item
  };
  const handleEdit = (id: string) => {

  }

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    renderCell: (params) => {
      return (
        <div className="action h-full flex justify-center items-center">
          <div className="edit" onClick={() => handleEdit(params.row.userId)}>
            <Image src="/view.svg" width={10} height={10} alt="" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.userId)}>
            <Image src="/delete.svg" width={10} height={10} alt="" />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="dataTable flex-1 m-2">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          }
        }}
        
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableEval
        columnVisibilityModel={{}}
      />
    </div>
  )
}

export default DataTable