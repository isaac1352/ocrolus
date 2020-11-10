const unirest = require('unirest');

module.exports = (request, response, next) => {

    let count=0

    request.fileArrray.forEach((element, index) => {

        console.log(element.fileName, 'element')
        if (element.fileName) {

            const req = unirest.
                post('https://api.ocrolus.com/v1/book/upload/mixed').
                auth({ user: 'hypromark@gmail.com', pass: '1431Rp@13135252' }).
                field('pk', `${request.book}`).
                attach('file', `./qb_pdf_files/${element.fileName}`).
                // attach('file', `/tmp/${fileName}`).
                then(res => {
                    console.log(request.book, 'send to Ocrolus')
                    console.log('response', res.body.response.mixed_uploaded_docs);
                    element.uploadInfo = res.body.response.mixed_uploaded_docs[0]

                    console.log(element.uploadInfo, 'element.uploadInfo')
                    if (++count === request.fileArrray.length) {

                        next()
                    }


                }).catch(err => {
                    console.log('error', err);
                });
        }
    });

}