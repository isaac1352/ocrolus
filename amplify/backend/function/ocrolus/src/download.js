const fs = require("fs")


fs.writeFile(`./qb_pdf_files/${element.fileName}`, dataResults, { encoding: 'base64' }, (err) => {
    



    if (err) {
        console.log(err)
    } else {
        console.log('file created')
