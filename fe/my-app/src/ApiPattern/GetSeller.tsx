"use server"
import GetPattern from '@/ApiPattern/GetPattern';
import React from 'react'

export default async function GetSeller() {
  let url = process.env.NEXT_PUBLIC_API_URL + "/api/seller/get/1";
  const response = await GetPattern(url,{});
  return response;
}
