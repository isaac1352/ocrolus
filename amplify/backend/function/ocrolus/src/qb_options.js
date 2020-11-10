require('dotenv').config();
var envvar = require('envvar');
var QB_AUTH = envvar.string('QB_AUTH');

module.exports=(path,method)=>{

    const headers = {
        'QB-Realm-Hostname': 'scs.quickbase.com',
        'User-Agent': '{User-Agent}',
        'Authorization': QB_AUTH,
        'Content-Type': 'application/json'
      }
    
      const options = {
        hostname: 'api.quickbase.com',
        path: path,
        method: method,
        headers
      };

      return options
      

}