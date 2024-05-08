import React from 'react'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'
import fs from 'fs';
export default function ExportToWord(htmlContent: any, styles: any, cssStyle: any) {
    if (htmlContent) {
        const htmlString = `
            <!DOCTYPE html>
            <html>
              <head>
                <style>${styles}</style>
                <style>${cssStyle}</style>
              </head>
              <body>${htmlContent.outerHTML}</body>
            </html>
          `;

        asBlob(htmlString, {
            orientation: 'portrait',
            margins: { top: 720, right: 720, bottom: 720, left: 720 },
        })
            .then((result) => {
                if (result instanceof Blob) {
                    saveAs(result, 'doc.docx');
                } else {
                    console.error('Unexpected result from asBlob:', result);
                }
            })
            .catch((err) => {
                console.error('Error exporting to Word:', err);
            });
    }
}
