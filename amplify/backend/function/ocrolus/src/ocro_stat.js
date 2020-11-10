module.exports = (req, res, next) => {


  console.log(req.body,"ocrolus stat")

  const pk = (req.body.raw_record.book_pk).toString();

  console.log(pk,'pk')

  const request = require('request');

  const options = {
    method: 'GET',
    url: 'https://api.ocrolus.com/v1/book/status',
    headers: {
      authorization: 'Basic aHlwcm9tYXJrQGdtYWlsLmNvbToxNDMxUnBAMTMxMzUyNTI='
    },
    body: { pk },
    json: true
  };

  request(options, function (error, response, body) {
    if (error != null){res.json(error) }

    console.log(JSON.stringify(body));

    req.docStat = body.response.docs
    req.book = pk

    console.log(req.docStat, 'req.docStat')
    if (req.docStat.length === 0) {
      res.json({ status: "not in book yet" })
    }
    next()
    // res.send(body)
  });

}