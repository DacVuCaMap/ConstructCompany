import { userData } from '@/data/authenticate';
import axios, { AxiosError } from 'axios'
import React from 'react'

export default async function GetPattern(url: any, thirdValue: any) {
    const token = userData()?.token;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error: ", error)
        console.error('Error :', axiosError.response?.data);
        return null;
    }
}
