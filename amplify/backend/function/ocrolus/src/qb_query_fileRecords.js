
const qb_options=require('./qb_options')
const options=qb_options('/v1/records/query','POST')

const https = require('https');
const { Console } = require('console');

module.exports=(request,response,next)=>{



    const req = https.request(options, (res) => {
        let data = '';
    
        
    
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
        request.fileArrray =[]
        console.log('qbRes before')
        const qbRes=JSON.parse(data).data[0]
        console.log(qbRes,'qbRes')

        console.log(Object.entries(qbRes))

        for (const [key, value] of Object.entries(qbRes)) {

          const url=value.value.url
          const recordId=qbRes['3'].value
          console.log(qbRes['3'].value,'record')

          if(url){
          request.recordId=recordId
          console.log(`${key}: ${value.value.url}`);
          request.fileArrray.push({recordId,url,key})
          }
          
        
        
        
        }

        console.log(request.fileArrray,'request.fileArrray')
        if(request.fileArrray.length>0){
          next()
        }else{
          response.json({status:'good'})

        }

       // response.json({status:'good'})

       /* JSON.parse(data).data.forEach(element => {
          const recordId=element['3'].value;
          const url=element['7'].value.url;
          request.fileArrray.push({recordId,url})
        });;*/
         
        // console.log(request.fileArrray,'file rec',request.fileArrray.length)

         
        // next()
           // response.json({results:results[0]['7'].value.url})
          
    
         
          /*results.forEach(element => {
            console.log(element["20"].value,'theelement',element["35"].value,'id')
            if(element["35"].value){
              console.log('in')
        
        }
          });*/
    
    
    
   
    
    
        });
    
      }).on("error", (err) => {
        console.log("Error: ", err.message);
        response.json(`the error${err}`)
      });
    
    
    
      //ehyc6q4bt9qb6t6qn
      //mu3pl7u7avogq5bw8vj4r


      const query=request.query.recordId?`{
        "from": "bku9uz5wx",
        "select": [
          7,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          3
          
        ],
        "where": "{3.EX.${request.query.recordId}}"
        
      
      }`:`{
        "from": "bku9uz5wx",
        "select": [
          7,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          3
          
        ],
        "where": "{355.EX.TRUE}"
        
        
        
      }`;




console.log(query)
    
    
      req.write(query);
      req.end();
    
    
    
    
  }






