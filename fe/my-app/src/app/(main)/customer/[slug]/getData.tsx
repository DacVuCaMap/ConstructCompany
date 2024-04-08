import GetPattern from '@/ApiPattern/GetPattern';
import React from 'react'

export default async function getData(slug:string,size:any,page:any) {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/customers/${slug}?size=${size}&page=${page}`;
    const data = await GetPattern(url, {});
    if (data === null) {
      return [];
    }
    const arrCustomer = data.content;
    const arrRs: any[] = [];
    if (arrCustomer != null) {
      let count = 0;
      arrCustomer.map((item: any) => (
        arrRs.push({
          id: count++,
          companyName: item.name,
          address: item.unit,
          taxCode: item.inventory,
          debt: item.price,
          create_At: item.create_At,
          update_At: item.update_At
        })))
    }
    return arrRs;
}
