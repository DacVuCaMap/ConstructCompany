// "use server"
// import React from 'react'
// import fs from 'fs';
// export default async function WriteObjectToJson(path:string,item:any) {
//     const updateJson = JSON.stringify(item,null,2);
//     fs.writeFileSync(path,updateJson);
// }
// pages/api/write-file.js
// "use server"
// import fs from 'fs';
// import path from 'path';

// export default async function handler(req:any, res:any) {
//   if (req.method === 'POST') {
//     const data = req.body;
//     const filePath = path.join(process.cwd(), 'src', 'data', 'sellerData.json');

//     try {
//       const updatedJson = JSON.stringify(data, null, 2);
//       fs.writeFileSync(filePath, updatedJson);
//       res.status(200).json({ message: 'File written successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error writing file' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }