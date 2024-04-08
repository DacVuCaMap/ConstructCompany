import GetPattern from '@/ApiPattern/GetPattern';
import ProductList from '@/components/List/Product/ProductList';
import { testData } from '@/data/data';
import Product from '@/model/Product';
import { notFound } from 'next/navigation';
import React, { useState } from 'react'

export default async function page({ params }: { params: { slug: string } }) {

  const url = process.env.NEXT_PUBLIC_API_URL + "/api/products?size=5&page=" + params.slug;
  const data = await GetPattern(url, {});
  
  if (data === null) {
    notFound();
  }

  const arrayProduct = data._embedded.products;
  const arrRs : any[] = [];
  if (arrayProduct != null) {
    let count = 0;
    arrayProduct.map((item: any) => (
      arrRs.push({
        id: count++,
        proName: item.proName,
        unit: item.unit,
        inventory: item.inventory,
        price: item.price,
        description: item.description,
        create_At: item.create_At,
        update_At: item.update_At
      })
    ))
  }

  return <ProductList data={arrRs} page={params.slug} />

}
