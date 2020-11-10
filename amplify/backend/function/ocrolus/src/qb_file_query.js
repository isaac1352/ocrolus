require('dotenv').config();
var envvar = require('envvar');
var QB_AUTH = envvar.string('QB_AUTH');




const headers = {
  'QB-Realm-Hostname': 'scs.quickbase.com',
  'User-Agent': '{User-Agent}',
  'Authorization': QB_AUTH,
  'Content-Type': 'application/json'
}

module.exports = (request, response, next) => {

  let count = 0
  
  request.fileArrray.forEach((element, index) => {

    

    if (index < 13) {

      const https = require('https');
      const options = {
        hostname: 'api.quickbase.com',
        path: `/v1${element.url}`,
        method: 'GET',
        headers
      };




      const req = https.request(options, (res) => {

        element.fileName = res.headers['content-disposition'] ? JSON.parse(res.headers['content-disposition'].split('=')[1]) : null

        element.dataResults = []

        res.on('data', (d) => {
          element.dataResults.push(d)
        });

        res.on('end', (d) => {
          console.log(element.fileName)
console.log(count," ",request.fileArrray.length-1)
          
          if(++count===request.fileArrray.length){
            next()
          }
          


        });
      });

      req.on('error', (e) => {
        console.error(e);
      });
      req.end();
    }
  })


}