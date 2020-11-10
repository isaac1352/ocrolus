const https = require('https');
require('dotenv').config();
var envvar = require('envvar');
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

module.exports=(request,response,next)=>{

    let allResults=""
    const req = https.request(options, (res) => {
        let data = '';
    
        
    
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
    
          results = JSON.parse(data)
          console.log(results,'the results')
          next()
         // response.json({status:'good'})
        });
    
      }).on("error", (err) => {
        
        response.json(`the error${err}`)
      });
      
      
      
      req.write(`{"to":"bqxvtuiax","mergeFieldId":7,"data":[${allResults}],"fieldsToReturn":[3]}`);
      req.end();
}
