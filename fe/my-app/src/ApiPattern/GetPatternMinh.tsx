"use server"
import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers';
import React from 'react'

export default async function GetPatternMinh(url: any, thirdValue: any) {
    const cookie = cookies();
    const token = cookie.get('jwt')?.value;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        return null;
    }
}
