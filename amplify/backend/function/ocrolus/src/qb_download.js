
const fs = require("fs")

//const qb_options = require('./qb_options')


//const options=qb_options('/v1/files/bku9uz5wx/225901/7/0','GET')

const https = require('https');



module.exports = (request, response, next) => {

    const length=request.fileArrray.length

    let count = 0

   

    request.fileArrray.forEach((element,index)=> {
console.log(index,'index')
        console.log(element,'for download')
        const options = qb_options(`/v1${element.url}`, 'GET')

        https.get(options, (res) => {
            let dataResults = []
            console.log(res.headers['content-disposition'])

            
    console.log(element," ",res.headers['content-disposition'],'content-disposition')

  

   
           const  fileName =res.headers['content-disposition']? JSON.parse(res.headers['content-disposition'].split('=')[1]):null
            element.fileName=fileName
            
    
            console.log(element)
    
            //request.fileName = fileName;
    
            res.on('data', (d) => {
    
    
                // process.stdout.write(d);
                dataResults.push(d);
    
               
    
    
            });
    
            res.on('end', () => {
    
    
              //  fs.writeFile(`/tmp/${fileName}`, dataResults, { encoding: 'base64' }, (err) => {
                    fs.writeFile(`./qb_pdf_files/${element.fileName}`, dataResults, { encoding: 'base64' }, (err) => {
    
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('file created')
    
                        
                       
    
                        if (++count === request.fileArrray.length) {
                            response.json({staus:'done'})
                         //   next()
                        }
                    }
    
                })
    
    
    
                //  download = Buffer.from(dataResults.toString('utf-8'), 'base64');
                
    
                //response.json("done")
            })
    
        }).on('error', (e) => {
            console.error(e);
        });




        

    })



}

