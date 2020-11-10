
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


    const req = https.request(options, (res) => {
        let data = '';
    
    
    
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
    
          results = JSON.parse(data)
          console.log(results, 'qb_insert_book_pk')
         next()
    
        });
    
      }).on("error", (err) => {
    
        console.log(err, "error from qb_in")
      });
    
    
    
      req.write(`{"to":"bqyrq2yuw","data":[{"6":{"value":"${request.book}"}}],"fieldsToReturn":[3]}`);
      req.end();
    
    
    }    