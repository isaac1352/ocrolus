
const { Console } = require('console');
var envvar = require('envvar');
require('dotenv').config();
const https = require('https');
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



module.exports = (request, response, next) => {

  let allResults = ""
  request.fileArrray.forEach((element, index) => {

    console.log(element.uploadInfo.pk, 'element.uploadInfo pk')

    allResults += `{"15":{"value":"${request.recordId}"},"52":{"value":"${request.book}"},
    "13":{"value":"${element.uploadInfo.pk}"},"28":{"value":"${element.key}"},"38":{"value":"${element.uploadInfo.page_count}"}}`

    if (index < request.fileArrray.length - 1) {
      allResults += ","

    }

  })



  console.log(allResults, 'in insert')


  const req = https.request(options, (res) => {
    let data = '';



    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {

      results = JSON.parse(data)
      console.log(results, 'the results')
      response.json({ results })

    });

  }).on("error", (err) => {

    console.log(err, "error from qb_in")
  });



  req.write(`{"to":"bqx4ny2xd","data":[${allResults}],"fieldsToReturn":[3]}`);
  req.end();






}