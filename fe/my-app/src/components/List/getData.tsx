import GetPattern from '@/ApiPattern/GetPattern';
import { userData } from '@/data/authenticate';
import { toltalPageGlobal } from '@/data/data';
export default async function getData(component:string,slug:string,size:any,page:any,search:any) {
    search = !search ? '': search
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/${component}/${slug}?size=${size}&page=${page}&search=${search}`;
    console.log(url);
    const data = await GetPattern(url, {
    });
    if (data === null) {
      console.log("vao null")
      return [];
    }
   
    let arrRs: any[] = [];
    if (component === "product") {
      toltalPageGlobal.value=data.productPage.totalPages;
      arrRs = data.productPage.content; 
    }
    else if(component ==="customers"){
      toltalPageGlobal.value=data.customerPage.totalPages;
      arrRs=data.customerPage.content;
    }
    else{
      toltalPageGlobal.value=data.totalPages;
      arrRs = data.content;
    }
    return arrRs;
}
