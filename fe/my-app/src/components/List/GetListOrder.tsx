// "use client"
// import { useSearchParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import LoadingScene from '@/components/LoadingScene'
// import DataTable from '@/components/DataTable/DataTable'
// import AddComponent from '@/components/CRUDTAB/AddComponent'
// import getData from './getData'

// export default function GetListOrder() {
//   const searchParams = useSearchParams();
//   const size = searchParams.get('size');
//   const page = searchParams.get('page');
//   const [data, setData] = useState<object[]>([])
//   const [loading,setLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getData(firstParams,props.querySlug, size, page);
//         console.log("result",result)
//         setData(result);
//       } catch (error) {
//         setData([]);
//       }
//     };

//     fetchData();
//     setLoading(false);
//   }, [props.querySlug, size, page,props.slug]);
//   const [openAdd, setOpenAdd] = useState(false);
//   return (
//     <div className='w-full h-full flex flex-col'>
//       {props.slug}
//       <div className='m-5'>
//         <button onClick={() => setOpenAdd(!openAdd)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Add Customer
//         </button>
//       </div>
//       {loading ? <LoadingScene /> : <DataTable componentEditData={props.EditDataField} validValueSchema={props.dataSchema} columns={props.columnData} rows={data} slug={props.slug} />}
//       <div>
//         {openAdd && <AddComponent componentData={props.AddDataField} validValueSchema={props.dataSchema} slug={'Cutomer'} setOpen={setOpenAdd} apiUrl={props.apiAddData} />}
//       </div>
//     </div>
//   )
// }

