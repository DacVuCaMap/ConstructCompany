import axios, { AxiosError } from 'axios'
import React from 'react'

export default async function DeletePattern(url: any, thirdValue: any) {
    try {
        const response = await axios.delete(url, thirdValue);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error: ", error)
        console.error('Error :', axiosError.response?.data);
        return null;
    }
}
