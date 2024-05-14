"use client"
import { flexResponsive } from '@/data/dataResponsive';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form';
import DisableScreen from '../DisableScreen';
import postData from '@/ApiPattern/PostPattern';

type Props = {
  componentData: any,
  validValueSchema: any,
  slug: string,
  apiUrl: string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  nameSlug: string
}

export default function AddComponent(props: Props) {
  const [errorForm, setErrorForm] = useState(false);
  const [change, setChange] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errNof,setErrNof] = useState("");
  document.body.style.overflow = "hidden"
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(props.validValueSchema),
  });

  const onSubmit = async (data: any) => {
    setErrorForm(false)
    console.log(data);
    const url = process.env.NEXT_PUBLIC_API_URL + props.apiUrl;
    const response = await postData(url, data, {});
    console.log("response: ", response)
    if (response == null || response.status === 400) {
      if (props.slug=="product") {
        setErrNof(response.data);
        setErrorForm(true);
        return;
      }
      setErrNof(response.message)
      setErrorForm(true);
      return;
    }
    console.log(response);
    //success
    setSuccess(true);
    setChange(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
    reset();
  };
  const handleCancel = () => {
    document.body.style.overflow = "unset"
    if (change) {
      window.location.reload();
    }
    props.setOpen(false);
  }
  return (
    <div onClick={handleCancel} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className='h-screen w-screen flex justify-center items-center'>
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white overflow-auto h-5/6 shadow-md rounded px-8 pt-6 pb-8 mb-4 z-51 w-full lg:max-w-4xl"
        >
          <h2 className='text-gray-700 font-bold text-4xl mb-4'>{props.nameSlug}</h2>
          {errorForm && (
            <p className="text-red-500 text-xs italic">Lỗi Không thêm do: {errNof}</p>
          )}
          {success && (
            <p className="text-green-700 italic">Tạo thành công</p>
          )}
          <div className={`flex lg:flex-row w-full flex-col flex-wrap pb-2 mb-2 border-b border-t overflow-auto h-3/4 border-neutral-400 gap-x-4`}>
            {props.componentData.map((item: any) => (
              <div className={`mb-2 pr-2 lg:w-${item.width}`} key={item.id}>
                {/* {item.width} */}
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  {item.title}
                </label><input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[item.field] ? 'border-red-500' : ''}`}
                  type={item.type}
                  step={item.type === "number" ? "0.01" : undefined}
                  {...register(item.field)} />
                {errors[item.field] && (
                  <p className="text-red-500 text-xs italic">{(errors[item.field] as FieldError)?.message}</p>
                )}
              </div>

            ))}
          </div>


          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Hoàn Thành
            </button>
            {success && (
              <p className="text-green-700 italic">Tạo thành công</p>
            )}
            <button
              className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleCancel}
            >
              X Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
