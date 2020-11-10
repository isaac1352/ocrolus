const request = require('request');

module.exports=(req, res,next) => {


let count=0;
  req.ocrolusResponse=[];

  req.docStat.forEach((element,index) => {
    
  
   
  
    const options = {
      method: 'GET',
      url: 'https://api.ocrolus.com/v1/document/forms/fields',
      headers: { 'content-type': 'application/json', authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI=' },
  
      body: { pk: `${element.pk}` },
      json: true
    };
    //5540322 1 doc reject
    request(options, function (error, response, body) {

  console.log(element)
      if (error) throw new Error(error);
  
     
      if(body.response){
  
      //console.log(body.response.forms[0].raw_fields['invoice_summary-Part3-BuyerDetails:buyerName(BillTo)']);
      body.response.forms.forEach(results=>{
        results.statusPk=element.pk
        req.ocrolusResponse.push(results)
        console.log(results)
      })

    }
      if(++count===req.docStat.length){
      //res.json(body.response)
      next()
      }
     
    });
  })
  
  
  }