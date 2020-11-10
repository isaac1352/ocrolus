const https = require('https');
require('dotenv').config();
var envvar = require('envvar');
const { nextTick } = require('process');
var QB_AUTH = envvar.string('QB_AUTH');


const options = {
    hostname: 'api.quickbase.com',
    path: '/v1/records',
    method: 'POST',
    headers: {
        'QB-Realm-Hostname': 'scs.quickbase.com',

        'User-Agent': '{User-Agent}',

        'Authorization': QB_AUTH,

        'Content-Type': 'application/json'


    }
};

module.exports = (request, response,next) => {

    console.log(request,'in the insert Stat')

    let allResults = ""

    request.docStat.forEach((element,index) => {

        allResults += `{
                        "13":{"value":"${request.book}"},
                        "6":{"value":"${element.status}"},
                        "7":{"value":"${element.name}"},
                        "8":{"value":"${element.pages}"},
                        "9":{"value":"${element.image_group_pk}"},
                        "10":{"value":"${element.pk}"},
                        "14":{"value":"${element.mixed_uploaded_doc_pk}"},
                        "12":{"value":"${element.md5}"}
                        }`




        if (index < request.docStat.length - 1) {
            allResults += ","
        }

    });





if(allResults){

    const req = https.request(options, (res) => {
        let data = '';



        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
console.log(allResults,'in the end')
           // response.json({ results: data })
           next()
        });

    }).on("error", (err) => {

        response.json(`the error${err}`)
    });



    req.write(`{"to":"bqyhny9re","mergeFieldId":10,"data":[${allResults}],"fieldsToReturn":[3]}`);
    req.end();
console.log('got in')
}


}