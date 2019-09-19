const axios = require('axios')
const cloudinary = require('cloudinary')

function fileUploadMiddleware(req, res) {
    let email;
    let url = req.headers.origin;
    if(url[url.length - 1] === '/')
        url = url.slice(0, -1);

    cloudinary.uploader.upload_stream((result) => {
        email = req.body.email;
        axios.post(`${url}/uploadFile`, {
                URL: result.secure_url,
                email: req.body.email,
                type: req.body.type,
                filename: req.body.filename
        })
        .then((response) => {
            // you can handle external API response here
            res.status(200).json({ success: true, fileURL: result.secure_url, email: email })
        }).catch((error) => {
            console.log(error)
            res.status(500).json(error.response.data);
        });
    }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware