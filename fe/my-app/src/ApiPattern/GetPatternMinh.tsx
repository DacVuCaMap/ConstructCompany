import axios, { AxiosError } from 'axios'
import React from 'react'

export default async function GetPattern(url: any, thirdValue: any) {
    try {
        const response = await axios.get(url, thirdValue);
        console.log(response)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error: ", error)
        console.error('Error :', axiosError.response?.data);
        return null;
    }
}
