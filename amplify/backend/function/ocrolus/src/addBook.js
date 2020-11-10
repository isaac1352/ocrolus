

module.exports = (req, res, next) => {








  const request = require('request');

  const options = {
    method: 'POST',
    url: 'https://api.ocrolus.com/v1/book/add',
    headers: {
      'content-type': 'application/json',
      authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI='
    },
    body: { name: `${req.recordId}AA` },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) { throw new Error(error) };

    if (body.response) {
      console.log(body.response.pk, 'BOOKid')
      req.book = body.response.pk
      console.log(req.book, "this is the bookID")

    }

    next()



  });

}