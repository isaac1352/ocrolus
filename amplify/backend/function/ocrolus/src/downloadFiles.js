
const fs = require("fs")

module.exports = (request,response,next)=>{

    console.log("in the downloadFiles")

    let count=0

    request.fileArrray.forEach((element, index) => {

    fs.writeFile(`./qb_pdf_files/${element.fileName}`, element.dataResults, { encoding: 'base64' }, (err) => {
    
        if (err) {
            console.log(err)
        } else {
            console.log('file created')

            
           

            if (++count === request.fileArrray.length) {
               
              next()
            }
        }

    })
    })

}