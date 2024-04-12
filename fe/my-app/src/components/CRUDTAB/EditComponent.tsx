"use client"
import { flexResponsive } from '@/data/dataResponsive';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { FieldError, useForm } from 'react-hook-form';
import DisableScreen from '../DisableScreen';
import postData from '@/ApiPattern/PostPattern';
import PutPattern from '@/ApiPattern/PutPattern';

type Props = {
  componentData: any,
  validValueSchema: any,
  slug: string,
  apiUrl: string,
  items:any,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditComponent(props: Props) {
  const [errorForm, setErrorForm] = useState(false);
  const [change, setChange] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldValue,setValueField] = useState({...props.items});
  // useEffect(()=>{
  //   setValueField({...props.items});
  // },[props.items])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueField((prevState : any)=> ({
      ...prevState,
      [name]: value
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(props.validValueSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const url = process.env.NEXT_PUBLIC_API_URL + props.apiUrl;
    let response = null;
    if (props.slug === 'product') {
      let url = process.env.NEXT_PUBLIC_API_URL + `/api/${props.slug}/edit-${props.slug}`
      response = await PutPattern(url,data,{});
    }
    else{
      let url = process.env.NEXT_PUBLIC_API_URL + `/api/${props.slug}s/edit-${props.slug}`
      response = await postData(url,data,{})
    }
    console.log("response: ", response)
    if (response == null) {
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
  };
  const handleCancel = () => {
    if (change) {
      window.location.reload();
    }
    props.setOpen(false);
  }
  const inputProps = (item:any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueField((prevState:any) => ({
        ...prevState,
        [item.field]: e.target.value
      }));
    };
  
    return {
      ...register(item.field),
      onChange: handleChange,
      className: `focus:outline-none focus:shadow-outline shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${errors[item.field] ? 'border-red-500' : ''} ${item.type === 'disable' ? 'cursor-not-allowed bg-gray-200' : ''}`,
      type: item.type,
      step: item.type === "number" ? "0.01" : undefined,
      value: fieldValue[item.field],
    };
  };
  return (
    <div onClick={handleCancel} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-51 w-full lg:max-w-4xl"
      >
        <h2 className='text-gray-700 font-bold text-4xl mb-4'>{props.slug}</h2>
        {errorForm && (
          <p className="text-red-500 text-xs italic">FAILED TO ADD {props.slug}</p>
        )}
        {success && (
          <p className="text-green-700 italic">Tạo thành công</p>
        )}
        <div className={`flex  ${flexResponsive} max-h-full flex-auto pb-2 mb-2 border-b border-neutral-400 gap-x-4`}>
          {props.componentData.map((item: any) => (
            <div className='flex-auto mb-2 ' key={item.id}>
              <label
                className="block text-gray-700 font-bold mb-2"
              >
                {item.title}
              </label>
              <input {...inputProps(item)} />
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

        </div>
      </form>
    </div>
  )
}
