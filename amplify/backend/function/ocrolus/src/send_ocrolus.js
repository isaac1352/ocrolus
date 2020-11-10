const unirest = require('unirest');

module.exports = (request, response, next) => {

    let count = {count:request.fileNames.length}

    console.log(request.query.type,'request.query.type')

    const type=request.query.type?request.query.type:"MIXED";

    switch (type) {
        case "All":
        case "MIXED":
            console.log('switch MIXED')

            request.fileNames.forEach(element => {
                sendOcrolusMixed(element,response,count)
            });

            if (type === "MIXED") {
            
                break;
            }

        case "INVOICE_SUMMARY":

            console.log('switch INVOICE_SUMMARY')

            request.fileNames.forEach(element => {
                sendOcrolusInvoice(element,response)
            });

            if (type === "INVOICE_SUMMARY") {
                
                break;
            }

        case "DISBURSEMENT_FORM":

            console.log('switch DISBURSEMENT_FORM')

            request.fileNames.forEach(element => {
                sendOcrolusDisbursement(element,response)
            });
            
                break;
           
        default:
            response.json("Sorry, no match")
            console.log('Sorry, no match');


    }





    console.log(request.fileNames, 'request.fileNames')







}

function sendOcrolusInvoice(fileName,response) {

    console.log(fileName,'in the function')

    const req = unirest.
        post('https://api.ocrolus.com/v1/book/upload').
        auth({ user: 'hypromark@gmail.com', pass: '1431Rp@13135252' }).
        field('pk', '5343119').
        field('form_type', 'INVOICE_SUMMARY').
        attach('file', `./${fileName}`).
       // attach('file', `/tmp/${fileName}`).
        then(res => {
            console.log('response', res.body);
            response.json({status:"good"})
        }).catch(err => {
            console.log('error', err);
        });

}

function sendOcrolusDisbursement(fileName,response) {

    const req = unirest.
        post('https://api.ocrolus.com/v1/book/upload').
        auth({ user: 'hypromark@gmail.com', pass: '1431Rp@13135252' }).
        field('pk', '5343273').
        field('form_type', 'DISBURSEMENT_FORM').
        attach('file', `./${fileName}`).
        // attach('file', `/tmp/${fileName}`).
        then(res => {
            console.log('response', res.body);
            response.json({status:"good"})
        }).catch(err => {
            console.log('error', err);
        });

}

function sendOcrolusMixed(fileName,response,count) {

    const req = unirest.
        post('https://api.ocrolus.com/v1/book/upload/mixed').
        auth({ user: 'hypromark@gmail.com', pass: '1431Rp@13135252' }).
        field('pk', '5343623').
        attach('file', `./${fileName}`).
       // attach('file', `/tmp/${fileName}`).
        then(res => {
            console.log('response', res.body);
            
            count.count--
            
            if(count.count===0){
            response.json({status:"good"})
            }
        }).catch(err => {
            console.log('error', err);
        });

}
