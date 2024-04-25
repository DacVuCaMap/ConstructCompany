"use server"
import React from 'react'
import fs from 'fs';
export default async function WriteObjectToJson(path:string,item:any) {
    const updateJson = JSON.stringify(item,null,2);
    fs.writeFileSync(path,updateJson);
}
