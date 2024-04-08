"use client"
import AddComponent from '@/components/CRUDTAB/AddComponent'
import { productSchema } from '@/components/CRUDTAB/validatorComponent'
import DataTable from '@/components/DataTable/DataTable'
import { AddCustomerField, AddProductField } from '@/data/ComponentData'
import { apiAddCustomer } from '@/data/apiUrl'
import { columnCus, columnProduct } from '@/data/listData'
import React, { useState } from 'react'
type Props = {
  data: any,
  url:any
}

export default function CustomerList(props: Props) {
  
}
