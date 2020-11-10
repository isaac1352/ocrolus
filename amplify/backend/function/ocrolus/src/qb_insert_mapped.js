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

module.exports=(request, response, next)=>{


  if(request.MappedResults!==""){
    console.log(request.MappedResults,'qb insert')

    const req = https.request(options, (res) => {
        let data = '';
    
        
    
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
    
          results = JSON.parse(data)
          console.log(results,'the results')
          next()
          
        });
    
      }).on("error", (err) => {
        
        console.log(err,"error from qb_in")
      });
      console.log(request.disbursementResults,'in the insert')
     // req.write(`{"to":"bqyfr3qss","data":[${request.disbursementResults}],"fieldsToReturn":[24]}`);
      
     req.write(`{"to":"bqxvtuiax","data":[${request.MappedResults}],"fieldsToReturn":[3]}`);
      req.end();
    }else{
      next()
    }
    
}