/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var fs = require("fs")
require('dotenv').config();
var envvar = require('envvar');
var QB_AUTH = envvar.string('QB_AUTH');
const https = require('https');
var print = require('pretty-print');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});




app.get('/uploadAxios', require('./qb_query_fileRecords'),
  require('./qb_file_query'),
  require('./downloadFiles'),
  require('./addBook'),
  require('./qb_insert_book_pk'),
  require('./sendOcrolus'),
  require('./qb_insert_PK')


)

app.get('/bookStatus', (req, res) => {


})



app.get('/books', (req, res) => {


  const request = require('request');

  const options = {
    method: 'GET',
    url: 'https://api.ocrolus.com/v1/books',
    headers: {
      authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI='
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(JSON.stringify(body));
    res.send(body)
  });

})


app.post('/status', require('./ocro_stat'), require('./qb_insert_Stat'),require('./ocro_get_res'),
require('./parse_Doc_results'),
require('./qb_insert_mapped'),
require('./qb_insert_disbursement'))






app.get('/mixedResults', (req, res) => {
  const request = require('request');

  index = req.query.index

  const options = {
    method: 'GET',
    url: 'https://api.ocrolus.com/v1/transaction',
    headers: { 'content-type': 'application/json', authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI=' },
    body: { book_pk: '5540322' },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body.response)

    //console.log(body.response.forms[0].raw_fields['invoice_summary-Part3-BuyerDetails:buyerName(BillTo)']);
    res.send(body.response)
  });



})

app.get('/invoiceResults',
  require('./ocro_get_res'),
  require('./parse_Doc_results'),
  require('./qb_insert_mapped'),
  require('./qb_insert_disbursement')
)

app.get('/formData',(req,res)=>{

  const request = require('request');

  

  const options = {
    method: 'GET',
    url: 'https://api.ocrolus.com/v1/document/forms/fields',
    headers: { 'content-type': 'application/json', authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI=' },

    body: { pk: '11175542' },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body.response.forms[0])

    //console.log(body.response.forms[0].raw_fields['invoice_summary-Part3-BuyerDetails:buyerName(BillTo)']);
    res.send(body.response.forms[0])
  });


})

app.get('/disbursementResults', (req, res) => {
  const request = require('request');

  index = req.query.index

  const options = {
    method: 'GET',
    url: 'https://api.ocrolus.com/v1/book/forms',
    headers: { 'content-type': 'application/json', authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI=' },

    body: { pk: '5343623' },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body)

    //console.log(body.response.forms[0].raw_fields['invoice_summary-Part3-BuyerDetails:buyerName(BillTo)']);
    res.send(body.response.forms[index])
  });



})


/**********************
 * Example get method *
 **********************/

app.get('/items', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed *!', url: req.url });
});

/****************************
* Example post method *
****************************/





app.post('/items', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/items', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
