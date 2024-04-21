'use client'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PaginationComponent from '../List/PaginationComponent/PaginationComponent';
import { columnAccount } from '@/data/listData';
import GetPattern from '@/ApiPattern/GetPattern';
import LoadingScene from '../LoadingScene';
import './dataTable.scss'
import RegisterAccount from './RegisterAccount';
import { AddAccount } from '@/data/ComponentData';
import { schemaAccount } from '@/data/schemaData';

export default function AdminList() {
    const searchParam = useSearchParams();
    const page = searchParam.get('page');
    const size = searchParam.get('size');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    useEffect(() => {
        let url = process.env.NEXT_PUBLIC_API_URL + `/api/account/list?page=${page}&size=${size}`
        const fetch = async () => {
            try {
                const response = await GetPattern(url, {})
                setData(response.content);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
        setLoading(false);
    }, [])
    console.log(data);
    const handleDelete = (id: any) => {

    }
    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        flex: 0.2,
        renderCell: (params: any) => {
            return (
                <div className="action h-full flex justify-center items-center">
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <Image src="/delete.svg" width={10} height={10} alt="" />
                    </div>
                </div>
            );
        }
    }
    return (
        <div className="dataTable flex-1 m-2 ">
            <h2 className='text-gray-700 font-bold text-4xl mb-4'>Quản lí tài khoản</h2>
            {openAdd && <RegisterAccount componentData={AddAccount} validValueSchema={schemaAccount} setOpen={setOpenAdd} />}
            <button onClick={() => setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Tạo tài khoản
            </button>
            {loading ? <LoadingScene /> :
                <div>
                    <DataGrid
                        className="dataGrid hover:cursor-pointer"
                        rows={data}
                        columns={window.innerWidth<768 ? [...columnAccount.slice(0, 3), actionColumn] : [...columnAccount, actionColumn]}
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
                </div>}

        </div>
    )
}


